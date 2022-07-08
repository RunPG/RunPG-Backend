import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inventoryService } from '../service'

const inventoryController = Router()

// FIXME: Useless route ? we should get by userId instead
inventoryController.get('/:id', async (req, res) => {
  let inventory
  try {
    inventory = await inventoryService.getById(Number(req.params.id))
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (inventory == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(inventory)
  }
})

// TODO: Move to /user/:id/inventory
inventoryController.get('/user/:userId', async (req, res) => {
  /**
   * #swagger.summary = 'Get the inventory of an user'
   */
  const userId = Number(req.params.userId)
  if (isNaN(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let inventory
  try {
    inventory = await inventoryService.getByUserId(userId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  // TODO: Not found never triggers, and is the user doesn't exists, the array will be empty
  if (inventory == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(inventory)
  }
})

export default inventoryController
