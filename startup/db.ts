import mongoose from 'mongoose'
import config from 'config'
const logger = require(config.get('path') + '/startup/logging')

export default function () {
  mongoose.set('strictQuery', false)
  mongoose.set('returnOriginal', false)

  mongoose
    .connect(config.get('db'))
    .then(() =>
      logger.info(`Success: connected to ${config.get('db')} database`)
    )
}
