import mongoose, { ConnectionOptions } from 'mongoose'
import logger from './logger'
;(<any>mongoose).Promise = global.Promise

/**
 * A Mongoose Connection wrapper class to
 * help with mongo connection issues.
 *
 * This library tries to auto-reconnect to
 * MongoDB without crashing the server.
 * @author Tahsin
 */
export default class MongoConnection {
  /** URL to access mongo */
  private readonly mongoUrl: string

  /**
   * Internal flag to check if connection established for
   * first time or after a disconnection
   */
  private isConnectedBefore: boolean = false

  /** Mongo connection options to be passed Mongoose */
  private readonly mongoConnectionOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }

  /**
   * Start mongo connection
   * @param mongoUrl MongoDB URL
   */
  constructor(mongoUrl: string) {
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true)
    }

    this.mongoUrl = mongoUrl
    mongoose.connection.on('error', this.onError)
    mongoose.connection.on('disconnected', this.onDisconnected)
    mongoose.connection.on('connected', this.onConnected)
    mongoose.connection.on('reconnected', this.onReconnected)
  }

  /** Close mongo connection */
  public async close() {
    logger.log({ level: 'info', message: 'Closing the MongoDB connection' })
    // noinspection JSIgnoredPromiseFromCall
    await mongoose.connection.close(error => {
      if (error) logger.log({ level: 'error', message: 'Error shutting closing mongo connection', error })
      process.exit(0)
    })
  }

  /** Start mongo connection */
  public async connect() {
    logger.log({ level: 'info', message: `Connecting to MongoDB at ${this.mongoUrl}` })
    await mongoose.connect(this.mongoUrl, this.mongoConnectionOptions).catch(() => {})
  }

  /**
   * Handler called when mongo connection is established
   */
  private onConnected = () => {
    logger.log({ level: 'info', message: `Connected to MongoDB at ${this.mongoUrl}` })
    this.isConnectedBefore = true
  }

  /** Handler called when mongo gets re-connected to the database */
  private onReconnected = () => {
    logger.log({
      level: 'info',
      message: 'Reconnected to MongoDB',
    })
  }

  /** Handler called for mongo connection errors */
  private onError = () => {
    logger.log({ level: 'error', message: `Could not connect to ${this.mongoUrl}` })
  }

  /** Handler called when mongo connection is lost */
  private onDisconnected = () => {
    if (!this.isConnectedBefore) {
      setTimeout(async () => {
        await this.connect()
      }, 2000)
      logger.log({ level: 'info', message: 'Retrying mongo connection' })
    }
  }
}
