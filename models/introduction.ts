import mongoose from 'mongoose'
import Joi from 'joi'
import { Response, Request } from 'express'

export interface IntrodutionDocument {
  key: 'description'
  value: string
}

const introductionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
})

export function validateIntroduction(body: IntrodutionDocument, res: Response) {
  const schema = Joi.object({
    key: Joi.string().required().min(3).max(20).valid('description'),
    value: Joi.string().required().min(5).max(100),
  })

  const { error } = schema.validate(body)

  const result = {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }

  if (!result.valid) res.status(400).send(result.message)

  return result.valid
}

export default mongoose.model<IntrodutionDocument>(
  'Introduction',
  introductionSchema
)
