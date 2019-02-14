import R from 'ramda'

export class ApplicationError extends Error {
  constructor(...arg: any[]) {
    super(...arg)
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends ApplicationError {
  constructor(public errors: any) {
    super()
    this.name = 'ValidationError'
  }

  toString() {
    return JSON.stringify(this.errors)
  }
}

export class AuthenticationError extends ApplicationError {
  public HTTPStatus: number
  public detail: string

  constructor(message: string) {
    super(message || 'User not found.')
    this.HTTPStatus = 401
    this.name = 'AuthenticationError'
    this.detail = message || 'User not found.'
  }
}

export class AccessError extends ApplicationError {
  public HTTPStatus: number
  public detail: string

  constructor(message: string) {
    super(message || 'Access denied.')
    this.HTTPStatus = 403
    this.name = 'AccessError'
    this.detail = message || 'Access denied.'
  }
}

export const manipulateErrorData = (error: Error & { detail?: string }) => {
  const errors = R.pathOr(undefined, ['errors'], error)
  let message = R.pathOr(undefined, ['message'], error)

  if (error.message && error.message.includes('invalid values')) {
    message = undefined
  }

  return { errors, message, detail: error.detail, success: false }
}
