import BadRequest from '@root/src/errors/bad-request'
import errCodes from '@root/src/errors/error-codes'
import { Request, RequestHandler } from 'express'
import Joi from 'joi'

interface IRequestValidationSchema {
  body: Joi.Schema
  query: Joi.Schema
  header: Joi.Schema
}

export abstract class BaseController {
  requestValidationSchema: IRequestValidationSchema

  validateRequest = async (req: Request) => {
    const { query, body, headers } = req

    await this.requestValidationSchema.query.validateAsync(query).catch(error => {
      throw new BadRequest({ message: error.message, flag: errCodes.INVALID_QUERY_PARAM })
    })
    await this.requestValidationSchema.body.validateAsync(body).catch(error => {
      throw new BadRequest({ message: error.message, flag: errCodes.INVALID_BODY })
    })
    await this.requestValidationSchema.header.validateAsync(headers, { allowUnknown: true }).catch(error => {
      throw new BadRequest({ message: error.message, flag: errCodes.INVALID_HEADER })
    })
  }

  requestHandler: RequestHandler
}
