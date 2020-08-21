export default class ApplicationError extends Error {
  public message: string = 'ApplicationError'

  public status: number = 500

  constructor(message?: string, status?: number) {
    super()
    if (message) this.message = message
    if (status) this.status = status
  }
}
