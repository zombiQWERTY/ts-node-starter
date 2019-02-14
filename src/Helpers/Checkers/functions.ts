import R from 'ramda'

export const isInRange = (x: number, range: number[]): boolean => x >= range[0] && x <= range[1]

export const isValidRange = (start: number, end: number, range: number[] = [0, 23]): boolean =>
  isInRange(start, range) && isInRange(end, range)

export const allNumbers = R.all(R.is(Number))
