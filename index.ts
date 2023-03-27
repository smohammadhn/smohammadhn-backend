// Get project absolute Path
import { resolve } from 'path'

// enable usage of .env file for environment variables
import dotenv from 'dotenv'
dotenv.config({ path: resolve() + '/.env' })

// CONFIG: getting and setting global configuration for the project
import config from 'config'
;(config as any).path = resolve()

// --------------

import express, { Application, NextFunction, Request, Response } from 'express'

const app: Application = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('heelo')
})

app.listen(config.get('port'), () =>
  console.log(`server running on port ${config.get('port')}`)
)
