import { BaseController } from '@root/src/controllers/baseController'
import { Request, Response } from 'express'
import Joi from 'joi'
import Book from '../../models/Book'

export default class extends BaseController {
  requestValidationSchema = {
    body: Joi.object({}),
    query: Joi.object({
      name: Joi.string(),
      author: Joi.string(),
    }),
    header: Joi.object({}).unknown(),
  }

  requestHandler = async (req: Request, res: Response) => {
    await this.validateRequest(req, this.requestValidationSchema)

    const { name = undefined, author = undefined } = req.query

    const query: any = {}

    if (name) query.name = new RegExp(`.*${name}.*`, 'i')
    if (author) query.author = new RegExp(`.*${author}.*`, 'i')

    const books = await Book.find(query)
    res.send({ books })
  }
}
