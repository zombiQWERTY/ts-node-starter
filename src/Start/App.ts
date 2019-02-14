import http, { Server } from 'http'
import R from 'ramda'
import express, { Application } from 'express'
import importDir from 'import-dir'
import eventToPromise from 'event-to-promise'

import { Config, ConfigObject } from './Config'
import { middleware, setResponseMiddleware, setNotFoundMiddleware } from './middleware'
import { NODE_ENV } from '../Helpers/ENV/NODE_ENV'
import { logger } from '../Helpers/Logger/functions'
import { describeModule, Route } from './Router'

process.on('uncaughtException', error => logger.error('uncaughtException', error))
process.on('unhandledRejection', reason => logger.error('unhandledRejection', reason))

export class App {
  private static readonly _instance: App = new App()
  public readonly app: Application
  public server: Server | null = null
  public readonly config: ConfigObject = Config.instance.config
  public readonly routes: any = importDir('../routes') // TODO: types

  constructor() {
    if (App._instance) {
      throw new Error('Error - use App.instance') // TODO: AppError, log
    }

    this.app = express()
    this.app.use(middleware())

    const routes = R.map(async (route: Route) => {
      const [prefix, router] = await describeModule(route)
      this.app.use(prefix, router)
      return route
    }, this.routes)

    Promise.all(Object.values(routes)).then(() => {
      this.app.use(setResponseMiddleware)
      this.app.use(setNotFoundMiddleware)
    })
  }

  public static get instance(): App {
    return App._instance
  }

  public start() {
    return this.createServer()
      .then(server => {
        this.server = server
        this.started()
      })
      .catch(error => {
        this.handleServerError(error)
        this.exit(error)
      })
  }

  private handleServerError(error: Error & { code: 'EACCES' | 'EADDRINUSE'; syscall: string }) {
    const { code, syscall, message } = error

    switch (code) {
      case 'EACCES':
        return 'Port requires elevated privileges.'
      case 'EADDRINUSE':
        return 'Port is already in use.'
      default: {
        if (syscall !== 'listen') {
          return `Error on start up. ${message}`
        } else {
          return `Listen error. ${message}`
        }
      }
    }
  }

  private started() {
    logger.info(`Server started on port ${this.config.service.port}. Environment: ${NODE_ENV}.`)
  }

  private exit(message: any, ...args: any[]) {
    logger.error(message, ...args)
    setTimeout(() => process.exit(1), 500)
  }

  private createServer(): Promise<Server> {
    const httpServer = http.createServer(this.app).listen(this.config.service.port)
    return eventToPromise(httpServer, 'listening')
  }
}
