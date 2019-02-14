import moment from 'moment'

export const createTimestamp = (date = moment.utc()) => date.toISOString()
export const createTimestamps = (timestamp = createTimestamp()) => ({
  createdAt: timestamp,
  updatedAt: timestamp
})
