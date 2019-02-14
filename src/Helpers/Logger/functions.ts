import R from 'ramda'
import * as log4js from 'log4js'
import { isProduction } from '../ENV/NODE_ENV'

const enum Levels {
  ALL = 'ALL',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  MARK = 'MARK',
  OFF = 'OFF'
}

const enum Appenders {
  CONSOLE = 'console',
  APP = 'app',
  FILE = 'file'
}

const getLevel = (level: Levels): Levels => (isProduction() ? level : Levels.ALL)
const getAppenders = (appenders: Appenders[]): Appenders[] =>
  isProduction() ? appenders : R.append(Appenders.CONSOLE, appenders)

const createFileAppender = (name: Appenders) => ({
  backups: 3,
  type: 'file',
  compress: true,
  maxLogSize: 10485760,
  filename: `./log/${name}.log`
})

log4js.configure({
  appenders: {
    console: { type: Appenders.CONSOLE },
    file: createFileAppender(Appenders.APP)
  },
  categories: {
    default: {
      level: getLevel(Levels.INFO),
      appenders: getAppenders([Appenders.FILE])
    }
  }
})

export const logger = log4js.getLogger()
