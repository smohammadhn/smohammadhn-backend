import express, { Request, Response } from 'express'
import oid from '../middlewares/oid'
import Expertise, {
  validateExpertise,
  ExpertiseDocument,
} from '../models/expertise'

const router = express.Router()

// get methods
router.get('/', async (req: Request, res: Response) => {
  await Expertise.find()
    .sort('_id')
    .then((result) => {
      res.send(result)
    })
})

router.get('/:id', oid, async (req: Request, res: Response) => {
  await Expertise.findById(req.params.id).then((result) => {
    if (!result)
      return res.status(404).send('Expertise item with the given id not found!')

    res.send(result)
  })
})

// post methods
router.post(
  '/',
  async ({ body }: { body: ExpertiseDocument }, res: Response) => {
    if (!validateExpertise(body, res)) return

    const incomingItem = new Expertise({
      level: body.level,
      techTitle: body.techTitle,
      techStack: body.techStack,
      projectLinks: body.projectLinks,
    })

    await incomingItem.save().then((result) => res.send(result))
  }
)

// put method
router.put('/:id', oid, async (req: Request, res: Response) => {
  if (!validateExpertise(req.body, res)) return

  await Expertise.findByIdAndUpdate(req.params.id, req.body).then((result) => {
    if (!result)
      return res.status(404).send('Expertise item with the given id not found!')

    res.send(result)
  })
})

router.delete('/:id', oid, async (req: Request, res: Response) => {
  await Expertise.findByIdAndRemove(req.params.id).then((result) => {
    if (!result)
      return res.status(404).send('Expertise item with the given id not found!')

    res.send(result)
  })
})

export = router
