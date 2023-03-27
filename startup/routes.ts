import { Application } from 'express'
import error from '../middlewares/error'

export default function (app: Application) {
  const routes = ['home', 'introduction']

  routes.forEach((routeName) => {
    const routeMiddlewarePath = require(`../routes/${routeName}.ts`)

    let endPoint = `/api/${routeName}`
    if (routeName === 'home') endPoint = '/'

    app.use(endPoint, routeMiddlewarePath)
  })

  // global error handler (works in combination with express-async-errors)
  app.use(error)
}
