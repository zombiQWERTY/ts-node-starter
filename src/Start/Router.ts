import R from 'ramda'
import { Request, Response, NextFunction, Handler, Router } from 'express'
import routesVersifying from 'express-routes-versioning'
import wrap from 'express-async-wrap'
import { setResponse } from './responseHandler'

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => any
export type Middleware = (req: Request, res: Response, next: NextFunction) => any
export type RouteMethod = 'post' | 'get' | 'put' | 'patch' | 'delete'
export type RoutePrefix = string
export type Route = {
  prefix: RoutePrefix
  routes: {
    [method: string]: {
      [path: string]: {
        middleware: Middleware[]
        versions: {
          [version: string]: RouteHandler
        }
      }
    }
  }
}

const applyRoute = (route: Handler) => (req: Request, res: Response, next: NextFunction) => {
  return wrap(
    route(req, res, next)
      .then(setResponse(req, res))
      .catch(setResponse(req, res))
  )
}

export const describeModule = async ({ prefix, routes }: Route): Promise<[RoutePrefix, Router]> => {
  const router: Router = Router()
  const versify = routesVersifying()

  for (const [method, route] of R.toPairs(routes)) {
    for (const [url, { middleware, versions }] of R.toPairs(route)) {
      const handler = versify(R.map(applyRoute, versions))
      router[method as RouteMethod](url, ...middleware, handler)
    }
  }

  return [prefix, router]
}
