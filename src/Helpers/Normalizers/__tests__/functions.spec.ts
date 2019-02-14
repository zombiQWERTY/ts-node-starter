import Enum from 'enum'
import { toInt, omitPrivateFields, getEnumValues, isInEnum, toBool } from '../functions'

test('must convert string "1" to int', () => {
  expect(toInt('1')).toEqual(1)
})

test('must convert string "true" to true', () => {
  expect(toBool('true')).toEqual(true)
})

test('must convert string "false" to false', () => {
  expect(toBool('false')).toEqual(false)
})

test('must convert string "smth" to false', () => {
  expect(toBool('smth')).toEqual(false)
})

test('must convert pseudo enum to list', () => {
  const testEnum = new Enum(['test1', 'test2'])
  expect(getEnumValues(testEnum)).toEqual(['test1', 'test2'])
})

test('must return true if provided value is in provided enum', () => {
  const testEnum = new Enum(['test1', 'test2'])
  expect(isInEnum(testEnum, 'test1')).toEqual(true)
})

test('must return false if provided value is not in provided enum', () => {
  const testEnum = new Enum(['test1', 'test2'])
  expect(isInEnum(testEnum, 'test3')).toEqual(false)
})

test('must omit private fields', () => {
  const obj = {
    name: 'name',
    password: 'password',
    salt: 'salt',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }

  expect(omitPrivateFields(obj)).toEqual({ name: 'name' })
})
