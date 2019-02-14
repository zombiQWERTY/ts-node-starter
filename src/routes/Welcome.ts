import { Route } from '../Start/Router'
import { welcome } from '../Modules/Welcome/functions'

export default {
  prefix: '/',
  routes: {
    get: {
      '/': {
        middleware: [],
        versions: {
          '1.0.0': welcome
        }
      }
    }
  }
} as Route
