import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import oid from '../middlewares/oid'
import WorkExperience, {
  validateWorkExperience,
  WorkExperienceDocument,
} from '../models/workExperience'

const router = express.Router()

// get methods
router.get('/', async (req: Request, res: Response) => {
  await WorkExperience.find()
    .sort('_id')
    .then((result) => res.send(result))
})

router.get('/:id', oid, async (req: Request, res: Response) => {
  await WorkExperience.findById(req.params.id)
    .populate('sampleProjects')
    .then((result) => {
      if (!result)
        return res
          .status(404)
          .send('Work experience item with the given id not found!')

      res.send(result)
    })
})

// post methods
router.post(
  '/',
  async ({ body }: { body: WorkExperienceDocument }, res: Response) => {
    if (!validateWorkExperience(body, res)) return

    for (const oid of body.sampleProjects)
      if (!mongoose.Types.ObjectId.isValid(oid))
        return res.status(400).send(`Invalid oid:>> ${oid}`)

    const incomingItem = new WorkExperience({
      title: body.title,
      subtitle: body.subtitle,
      techStack: body.techStack,
      sampleProjects: body.sampleProjects,
    })

    await incomingItem
      .save()
      .then((result) => result.populate('sampleProjects'))
      .then((result) => res.send(result))
  }
)

// put method
router.put('/:id', oid, async (req: Request, res: Response) => {
  if (!validateWorkExperience(req.body, res)) return

  for (const oid of req.body.sampleProjects)
    if (!mongoose.Types.ObjectId.isValid(oid))
      return res.status(400).send(`Invalid oid:>> ${oid}`)

  await WorkExperience.findByIdAndUpdate(req.params.id, req.body).then(
    (result) => {
      if (!result)
        return res
          .status(404)
          .send('Work experience item with the given id not found!')

      res.send(result)
    }
  )
})

router.delete('/:id', oid, async (req: Request, res: Response) => {
  await WorkExperience.findByIdAndRemove(req.params.id).then((result) => {
    if (!result)
      return res
        .status(404)
        .send('Work experience item with the given id not found!')

    res.send(result)
  })
})

export = router
