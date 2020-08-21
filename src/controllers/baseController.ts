import { Request } from 'express'
// import { queryValidation, bodyValidation } from '@app/core/middlewares'

export class BaseController {
  validateRequest = (req: Request, schema: any) => {
    const { body, query } = schema
    // bodyValidation(body, req.body)
    // queryValidation(query, req.query)
  }
}
