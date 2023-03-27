// enable usage of .env file for environment variables
import dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

import config from 'config'
import { resolve } from 'path'
;(config as any).path = resolve()
console.log(config.get('path'))
console.log(config.get('port'))
console.log(config.get('jwtSecret'))

// --------------

import express, { Application, NextFunction, Request, Response } from 'express'

const app: Application = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('heelo')
})

app.listen(8000, () => console.log('server running on port 8000'))
