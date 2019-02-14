import R from 'ramda'
import Checkit, { Rules, Body } from 'checkit'

export const runValidator = R.curry((rules: Rules, data: Body) => rules.run(data))
export const makeRules = (rules: Rules) => new Checkit(rules)
