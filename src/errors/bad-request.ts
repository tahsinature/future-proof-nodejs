import { IApplicationErrorOption } from '@root/src/interfaces/IMixed'
import ApplicationError from './application-error'

export default class BadRequest extends ApplicationError {
  constructor(option?: IApplicationErrorOption) {
    super(400, { ...option, message: option.message || 'Bad request' })
  }
}
