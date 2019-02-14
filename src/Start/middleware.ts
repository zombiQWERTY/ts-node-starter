import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import R from 'ramda'
import helmet from 'helmet'
import morgan from 'morgan'
import qs from 'express-qs-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import { compose } from 'compose-middleware'
import { setResponse, Payload } from './responseHandler'
import { Middleware } from './Router'

const maxAge = 1200
const preflightContinue = true
const methods = ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD']

export const hosts = ['localhost'] // TODO: add prod domains on prod

// prettier-ignore
export const origin = R.reduce((acc: string[], origin) =>
  R.concat([`http://${origin}`, `https://${origin}`], acc), [], hosts)

const allowedHeaders = ['Keep-Alive', 'X-Request-ID', 'Content-Type', 'Authorization', 'accept-version']

export const middleware = (): Middleware =>
  compose([
    compression(),
    helmet(),
    morgan(':method :url :status :res[content-length] bytes - :response-time ms'),
    bodyParser.json({ limit: '5mb' }),
    bodyParser.urlencoded({ extended: false, limit: '5mb' }),
    cors({ origin, methods, allowedHeaders, maxAge, preflightContinue }),
    qs({})
  ])

export const setResponseMiddleware = (payload: Payload, req: Request, res: Response, next: NextFunction) =>
  setResponse(req, res, payload)

export const setNotFoundMiddleware = (req: Request, res: Response, next: NextFunction) =>
  setResponse(req, res, {
    success: false,
    HTTPStatus: 404,
    errors: {
      method: req.method,
      route: req.originalUrl,
      notFound: `Route not found.`
    }
  })
