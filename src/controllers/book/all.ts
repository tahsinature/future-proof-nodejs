import { BaseController } from '@root/src/controllers/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import Book from '../../models/Book'

export default class extends BaseController {
  requestValidationSchema = {
    body: Joi.object({}),
    query: Joi.object({}),
    header: Joi.object({}),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req, this.requestValidationSchema)

    const books = await Book.find()
    res.send({ books })
  }
}
