import dotenv from 'dotenv'

const result = dotenv.config()
if (result.error) dotenv.config({ path: '.env.default' })

import Container from './app'
import logger from './logger'

class Server {
  constructor(private container: Container) {
    process.on('SIGINT', async () => {
      logger.info('Gracefully shutting down')
      await container.stop().finally(() => process.exit(1))
    })
  }

  public async run() {
    this.container.app.listen()
  }
}

export = Server
