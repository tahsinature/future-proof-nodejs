import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'
import ApplicationError from './errors/application-error'
import routes from './routes'
import MongoConnection from './mongo-connection'
import errCodes from '@root/src/errors/error-codes'
import logger from '@root/src/logger'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

app.use(routes)

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err)

  if (err instanceof ApplicationError) res.status(err.status).json(err)
  else {
    res.status(500).json(new ApplicationError({ flag: errCodes.INTERNAL_SERVER_ERROR, httpCode: 500 }))
    logger.log({ level: 'error', message: 'Error in request handler', error: err })
  }
})

class Container {
  public readonly app = app
  private readonly mongoConnection = new MongoConnection(process.env.MONGO_URL)

  public async load() {
    await this.mongoConnection.connect()
  }

  public async stop() {
    await this.mongoConnection.close()
  }
}

export = Container
