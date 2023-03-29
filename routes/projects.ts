import express, { Request, Response } from 'express'
import oid from '../middlewares/oid'
import Project, { validateProject, ProjectDocument } from '../models/project'

const router = express.Router()

// get methods
router.get('/', async (req: Request, res: Response) => {
  await Project.find()
    .sort('_id')
    .then((result) => {
      res.send(result)
    })
})

router.get('/:id', oid, async (req: Request, res: Response) => {
  await Project.findById(req.params.id).then((result) => {
    if (!result)
      return res.status(404).send('Project item with the given id not found!')

    res.send(result)
  })
})

// post methods
router.post('/', async ({ body }: { body: ProjectDocument }, res: Response) => {
  if (!validateProject(body, res)) return

  const incomingItem = new Project({
    img: body.img,
    title: body.title,
    description: body.description,
    websiteLink: body.websiteLink,
    repositoryLink: body.repositoryLink,
    techStack: body.techStack,
  })

  await incomingItem.save().then((result) => res.send(result))
})

// put method
router.put('/:id', oid, async (req: Request, res: Response) => {
  if (!validateProject(req.body, res)) return

  await Project.findByIdAndUpdate(req.params.id, req.body).then((result) => {
    if (!result)
      return res.status(404).send('Project item with the given id not found!')

    res.send(result)
  })
})

router.delete('/:id', oid, async (req: Request, res: Response) => {
  await Project.findByIdAndRemove(req.params.id).then((result) => {
    if (!result)
      return res.status(404).send('Project item with the given id not found!')

    res.send(result)
  })
})

export = router
