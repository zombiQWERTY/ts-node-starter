import R from 'ramda'

export const NODE_ENV = R.compose(
  R.trim,
  R.pathOr('development', ['env', 'NODE_ENV'])
)(process)

export const isDevelopment = (value = NODE_ENV) => value === 'development'
export const isProduction = (value = NODE_ENV) => value === 'production'
export const isTesting = (value = NODE_ENV) => value === 'test'
