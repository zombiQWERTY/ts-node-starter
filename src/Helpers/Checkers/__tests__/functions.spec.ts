import { isInRange, isValidRange, allNumbers } from '../functions'

test('is x in provided range: x=2; range=[1,5]', () => {
  expect(isInRange(2, [1, 5])).toBeTruthy()
})

test('is x lower than provided range: x=0; range=[1,5]', () => {
  expect(isInRange(0, [1, 5])).toBeFalsy()
})

test('is x greater than provided range: x=6; range=[1,5]', () => {
  expect(isInRange(6, [(1, 5)])).toBeFalsy()
})

test('are x and y in range: x=2; y=4 range=[1,5]', () => {
  expect(isValidRange(2, 4, [1, 5])).toBeTruthy()
})

test('are x in range and y not in range: x=2; y=6 range=[1,5]', () => {
  expect(isValidRange(2, 6, [1, 5])).toBeFalsy()
})

test('are x not in range and y in range: x=0; y=6 range=[1,5]', () => {
  expect(isValidRange(0, 6, [1, 5])).toBeFalsy()
})

test('are x and y not in range: x=0; y=6 range=[1,5]', () => {
  expect(isValidRange(0, 6, [1, 5])).toBeFalsy()
})

test('must return true when in provided list all values are integer type ([1, 5])', () => {
  expect(allNumbers([1, 5])).toBeTruthy()
})

test('must return false when in provided list not all values are integer type ([1, 5, "a"])', () => {
  expect(allNumbers([1, 5, 'a'])).toBeFalsy()
})
