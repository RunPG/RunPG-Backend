import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { equipementBaseService } from '../service'

const equipementBaseController = Router()


equipementBaseController.get('/', async (_, res) => {
  /**
 * #swagger.summary = 'Get all equipements bases'
 */
  try {
    res.send(await equipementBaseService.getAll())
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default equipementBaseController
