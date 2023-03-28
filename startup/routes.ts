import { Application } from 'express'
import error from '../middlewares/error'
import fs from 'fs'
import config from 'config'
import path from 'path'
import logger from './logging'

export default async function (app: Application) {
  let routeFileNames: string[] = ['home']

  // read all files inside /router directory and register them as routes
  // avoid manually creating route middleware everytime a new route is created!
  await fs.promises
    .readdir(config.get('path') + '/routes/')
    .then((files) => {
      routeFileNames = [...files]
    })
    .catch((err) => logger.error(err.message, err))

  routeFileNames.forEach((routeFileName) => {
    const routeName = path.parse(routeFileName).name

    const routeMiddlewarePath = require(`../routes/${routeFileName}`)

    let endPoint = `/api/${routeName}`
    if (routeName === 'home') endPoint = '/'

    app.use(endPoint, routeMiddlewarePath)
  })

  // global error handler (works in combination with express-async-errors)
  app.use(error)
}
