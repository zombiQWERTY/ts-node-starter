import { Route } from '../Start/Router'
import { fillCard } from '../Modules/Cards/functions'
import { filesUploader } from '../Modules/Uploader/functions'

export default {
  prefix: '/api/card',
  routes: {
    patch: {
      '/': {
        middleware: [filesUploader().single('file')],
        versions: {
          /**
           * @api {patch} /api/card Update user's card
           * @apiName UpdateCard
           * @apiGroup Card
           *
           * @apiPermission student
           * @apiPermission teacher
           *
           * @apiHeader {String=application/json} content-type
           *
           * @apiSuccess 200 Success
           * @apiVersion 1.0.0
           */
          '1.0.0': fillCard
        }
      }
    }
  }
} as Route
