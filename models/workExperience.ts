import mongoose from 'mongoose'
import Joi from 'joi'
import { Response } from 'express'

export interface WorkExperienceDocument {
  title: string
  subtitle: string
  techStack: string[]
  sampleProjects: string[]
}

const workExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  subtitle: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  techStack: {
    type: [String],
    required: true,
  },
  sampleProjects: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
      },
    ],
    required: true,
  },
})

export function validateWorkExperience(
  body: WorkExperienceDocument,
  res: Response
) {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(30),
    subtitle: Joi.string().required().min(3).max(100),
    techStack: Joi.array().items(Joi.string()).required().min(1),
    sampleProjects: Joi.array().items(Joi.string()).required().min(1),
  })

  const { error } = schema.validate(body)

  const result = {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }

  if (!result.valid) res.status(400).send(result.message)

  return result.valid
}

export default mongoose.model<WorkExperienceDocument>(
  'WorkExperience',
  workExperienceSchema
)
