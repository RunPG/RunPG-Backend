import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inventoryService } from '../service'

const inventoryController = Router()

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

//TODO check (with just /:id)
inventoryController.get('/:userId', async (req, res) => {
  let inventory
  try {
    inventory = await inventoryService.getByuserId(Number(req.params.userId))
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

inventoryController.post('/', async (req, res) => {
  const userId = req.body.userId
  if (userId == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createdinventory
  try {
    createdinventory = await inventoryService.create(userId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdinventory == null) {
    res.status(StatusCodes.CONFLICT).send(`user with id '${userId}' inventory already exists`)
  }
  else {
    res.send(createdinventory)
  }
})

export default inventoryController
