import R from 'ramda'
import multer from 'multer'

import { mimeTypes, allowedSizes, AllowedMimeTypes } from './consts'
import { ValidationError } from '../../Helpers/Errors/classes'

const uploader = (fileType: keyof AllowedMimeTypes) => () =>
  multer({
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
      let error = null
      if (!file.originalname) {
        error = 'Invalid file.'
      }

      if (!mimeTypes[fileType].includes(file.mimetype)) {
        error = `Invalid mime type. ${file.mimetype}`
      }

      if (file.size >= allowedSizes[fileType]) {
        error = `File too big. ${file.size}`
      }

      if (error) {
        return next(new ValidationError({ file: error }), false)
      } else {
        return next(null, true)
      }
    }
  })

export const filesUploader = uploader('file')
