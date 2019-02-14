import { runValidator } from '../../Helpers/CheckIt/functions'
import { validateGettingCardRules } from './validations'
import { logger } from '../../Helpers/Logger/functions'

export const fillCard = async (req: any) => {
  const validData = await runValidator(validateGettingCardRules(), req.body)
  logger.info('Fill card', validData)

  return {}
}
