import moment from 'moment'
import { createTimestamps, createTimestamp } from '../functions'

test('must return current timestamp (in UTC)', () => {
  const now = moment.utc()

  expect(createTimestamp(now)).toEqual(now.toISOString())
})

test('must return object of current timestamps (in UTC)', () => {
  const now = createTimestamp(moment.utc())

  expect(createTimestamps(now)).toEqual({
    createdAt: now,
    updatedAt: now
  })
})
