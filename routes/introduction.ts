import express, { Request, Response } from 'express'
import oid from '../middlewares/oid'
import Introduction, {
  validateIntroduction,
  IntrodutionDocument,
} from '../models/introduction'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  await Introduction.find()
    .sort('_id')
    .then((result) => {
      res.send(result)
    })
})

router.get('/:id', oid, async (req: Request, res: Response) => {
  await Introduction.findById(req.params.id).then((introductionItem) => {
    if (!introductionItem)
      return res
        .status(404)
        .send('Introduction item with the given id not found!')

    res.send(introductionItem)
  })
})

// post methods
router.post(
  '/',
  async ({ body }: { body: IntrodutionDocument }, res: Response) => {
    if (!validateIntroduction(body, res)) return

    const introduction = new Introduction({
      key: body.key,
      value: body.value,
    })

    await introduction.save().then((result) => res.send(result))
  }
)

export = router
