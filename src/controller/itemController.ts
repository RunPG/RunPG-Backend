import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { itemService } from '../service'

const itemController = Router()

itemController.get('/', async (req, res) => {
  /**
   * #swagger.summary = 'Get items'
   * #swagger.responses[200] = { description: 'User inventory updated' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'id or quantity is not valid' }
   * #swagger.responses[404] = { description: 'Inventory does not exist' }
   */
  const id = Number(req.query.id)
  if (req.query.id != null && isNaN(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    if (req.query.id != null) {
      const item = await itemService.getById(id)
      if (item == null) {
        res.sendStatus(StatusCodes.NOT_FOUND)
      }
      else {
        res.send([item])
      }
    }
    else {
      res.send(await itemService.getAll())
    }
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default itemController
