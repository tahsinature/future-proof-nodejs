import { Document, Schema, model } from 'mongoose'

export interface IBook extends Document {
  name: string
  author: string
}

const schema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
})

const Book = model<IBook>('Book', schema)

export default Book
