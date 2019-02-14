import fs from 'fs'
import R from 'ramda'
import mkdirp from 'mkdirp'
import mime from 'mime-types'
import { promisify } from 'util'
import { Request } from 'express'
import { filesFolder } from './consts'
import { generateHash } from '../Hashes/functions'

import { logger } from '../../Helpers/Logger/functions'

type Folder = {
  folderName: string
  folderHash: string
}

type CustomFile = File & {
  originalname: string
  mimetype: string
  buffer: Buffer
}

type FileMeta = {
  fileName: string
  folderName: string
}

export const makeFolder = async (root: string, name: string): Promise<Folder> => {
  const folderHash = generateHash(name)
  const folderName = `${root}/${folderHash}`

  try {
    await promisify(mkdirp)(folderName)
    return { folderName, folderHash }
  } catch (error) {
    logger.error('Folder creation error', folderName, error)
    throw error
  }
}

export const saveFile = async (file: CustomFile, folder: Folder): Promise<FileMeta> => {
  const extension = mime.extension(file.mimetype)
  const { buffer, originalname } = file

  const fileHash = generateHash(originalname)
  const fileName = `${fileHash}.${extension}`

  try {
    await promisify(fs.writeFile)(`${folder.folderName}/${fileName}`, buffer)
    return {
      fileName,
      folderName: folder.folderHash
    }
  } catch (error) {
    logger.error('File saving error.', R.omit(['buffer'], file), folder, error)
    throw error
  }
}

export const uploadFile = async (req: Request & { file: CustomFile }): Promise<FileMeta> => {
  const folder = await makeFolder(filesFolder, req.file.originalname)
  const file = await saveFile(req.file, folder)
  return file
}
