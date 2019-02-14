import R from 'ramda'

export const toInt = (value: string) => parseInt(value, 10)
export const toBool = (value: string) => value && value === 'true'
export const getEnumValues = (Enum: any): any[] => R.map(R.prop('key'), Enum['enums'])
export const isInEnum = (Enum: any, val: string) => getEnumValues(Enum).includes(val)
export const mapByKeys = R.curry((fn: Function, keys: string[], obj: { [prop: string]: any }) =>
  R.mapObjIndexed((item, key) => (keys.includes(key) ? fn(item) : item), obj)
)

export const groupByProp = (R as any).o(R.groupBy, R.prop)
export const getByProp = R.curry((prop: string, list: { [prop: string]: any }[]) => R.map(R.prop(prop), list))
export const updatePath = R.curry((p: ReadonlyArray<string | number>, fn: Function, obj: { [prop: string]: any }) =>
  R.assocPath(p, fn(R.path(p, obj)), obj)
)

export const omitPrivateFields = R.omit(['password', 'salt', 'deletedAt', 'createdAt', 'updatedAt'])

export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj))
)
