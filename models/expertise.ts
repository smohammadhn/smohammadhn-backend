import mongoose from 'mongoose'
import Joi from 'joi'
import { Response } from 'express'

export interface ExpertiseDocument {
  level: 'senior' | 'junior'
  techTitle: string
  techStack: string[]
  projectLinks: string[]
}

const expertiseSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ['senior', 'junior'],
  },
  techTitle: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  techStack: {
    type: [mongoose.Schema.Types.String],
    required: true,
  },
  projectLinks: {
    type: [mongoose.Schema.Types.String],
    required: true,
  },
})

export function validateExpertise(body: ExpertiseDocument, res: Response) {
  const schema = Joi.object({
    level: Joi.string().required().valid('senior', 'junior'),
    techTitle: Joi.string().required().min(3).max(30),
    techStack: Joi.array().items(Joi.string()).required().min(1),
    projectLinks: Joi.array().items(Joi.string()).required().min(1),
  })

  const { error } = schema.validate(body)

  const result = {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }

  if (!result.valid) res.status(400).send(result.message)

  return result.valid
}

export default mongoose.model<ExpertiseDocument>('Expertise', expertiseSchema)
