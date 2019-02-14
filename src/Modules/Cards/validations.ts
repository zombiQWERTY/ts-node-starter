import { makeRules } from '../../Helpers/CheckIt/functions'

export const validateGettingCardRules = () =>
  makeRules({
    nickname: ['required', 'string']
  })
