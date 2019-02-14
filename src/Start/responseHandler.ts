import R from 'ramda'
import { Request, Response } from 'express'
import { logger } from '../Helpers/Logger/functions'
import { ApplicationError, manipulateErrorData } from '../Helpers/Errors/classes'

// prettier-ignore
export type Payload = Error | {
  [key: string]: any
}

const cleanUp = R.omit(['HTTPStatus', 'success'])
const isError = (payload: Payload) => payload instanceof Error || payload.success === false

export const setResponse = R.curry((req: Request, res: Response, payload: Payload) => {
  payload = payload || {}
  const status = R.pathOr(200, ['HTTPStatus'], payload)

  if (isError(payload)) {
    if (payload instanceof Error) {
      if (!(payload instanceof ApplicationError)) {
        logger.error(payload.toString())
      }
    } else {
      logger.error(JSON.stringify(payload))
    }

    const errorData = R.compose(
      cleanUp,
      manipulateErrorData,
      (data: Payload) => cleanUp(data)
    )(payload)

    return res.status(status).send({ payload: errorData, success: false })
  } else {
    return res.status(status).send({ payload: cleanUp(payload), success: true })
  }
})
