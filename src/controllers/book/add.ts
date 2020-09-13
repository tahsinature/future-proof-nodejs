import { BaseController } from '@root/src/controllers/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import Book from '../../models/Book'

export default class extends BaseController {
  requestValidationSchema = {
    body: Joi.object({
      name: Joi.string().required(),
      author: Joi.string().required(),
    }).required(),
    query: Joi.object({}).required(),
    header: Joi.object({}).required().unknown(),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req, this.requestValidationSchema)

    const { name, author } = req.body

    const book = new Book({ name, author })
    await book.save()

    res.send({
      message: 'Saved',
      book: book.toJSON(),
    })
  }
}
