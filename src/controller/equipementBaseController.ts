import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { equipementBaseService } from '../service'

const equipementBaseController = Router()


equipementBaseController.get('/', async (req, res) => {
  /**
  * #swagger.summary = 'Get equipement base'
  */
  const id = Number(req.query.id)
  if (req.query.id != null && isNaN(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    if (req.query.id != null) {
      const equipementBase = await equipementBaseService.getById(id)
      if (equipementBase == null) {
        res.sendStatus(StatusCodes.NOT_FOUND)
      }
      else {
        res.send([equipementBase])
      }
    }
    else {
      res.send(await equipementBaseService.getAll())
    }
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default equipementBaseController
