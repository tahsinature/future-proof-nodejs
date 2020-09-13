import errCodes from '@root/src/errors/error-codes'
import { IApplicationErrorOption } from '@root/src/interfaces/IMixed'

export default class ApplicationError extends Error {
  public message: string = 'ApplicationError'

  public status: number = 500

  public flag: string

  constructor(status?: number, option?: IApplicationErrorOption) {
    super()
    if (status) this.status = status
    if (option.message) this.message = option.message
    if (option.flag) this.flag = option.flag
  }
}
