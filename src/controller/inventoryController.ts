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

inventoryController.put('/:id/quantity', async (req, res) => {
  /**
   * #swagger.summary = 'Update the quantity of an inventory'
   * #swagger.responses[200] = { description: 'User inventory updated' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'id or quantity is not valid' }
   * #swagger.responses[404] = { description: 'Inventory does not exist' }
   */
  const id = Number(req.params.id)
  const quantity = Number(req.body.quantity)

  if (isNaN(id) || isNaN(quantity) || quantity < 0) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let inventory
  try {
    inventory = await inventoryService.updateQuantity(id, quantity)
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

export default inventoryController
