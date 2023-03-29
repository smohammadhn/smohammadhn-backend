import mongoose from 'mongoose'
import Joi from 'joi'
import { Response } from 'express'

export interface ProjectDocument {
  img: string
  title: string
  description: string
  techStack: string[]
  websiteLink: string
  repositoryLink: string
}

const projectSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 300,
  },
  websiteLink: {
    type: String,
    default: null,
    minLength: 3,
    maxLength: 100,
  },
  repositoryLink: {
    type: String,
    default: null,
    minLength: 3,
    maxLength: 100,
  },
  techStack: {
    type: [mongoose.Schema.Types.String],
    required: true,
  },
})

export function validateProject(body: ProjectDocument, res: Response) {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(30),
    img: Joi.string().required().min(3).max(30),
    description: Joi.string().required().min(3).max(300),
    websiteLink: Joi.string().min(3).max(100),
    repositorylink: Joi.string().min(3).max(100),
    techStack: Joi.array().items(Joi.string()).required().min(1),
  })

  const { error } = schema.validate(body)

  const result = {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }

  if (!result.valid) res.status(400).send(result.message)

  return result.valid
}

export default mongoose.model<ProjectDocument>('Projects', projectSchema)
