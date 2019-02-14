import { isDevelopment, isProduction, isTesting } from '../NODE_ENV'

test('checks development NODE_ENV', () => {
  expect(isDevelopment('development')).toBeTruthy()
  expect(isDevelopment('smth else')).toBeFalsy()
})

test('checks production NODE_ENV', () => {
  expect(isProduction('production')).toBeTruthy()
  expect(isProduction('smth else')).toBeFalsy()
})

test('checks testing NODE_ENV', () => {
  expect(isTesting('test')).toBeTruthy()
  expect(isTesting('smth else')).toBeFalsy()
})
