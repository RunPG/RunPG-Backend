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
inventoryController.get('/:player_id', async (req, res) => {
  let inventory
  try {
    inventory = await inventoryService.getByPlayerId(Number(req.params.player_id))
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
  const id_player = req.body.id_player
  if (id_player == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createdinventory
  try {
    createdinventory = await inventoryService.create(id_player)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdinventory == null) {
    res.status(StatusCodes.CONFLICT).send(`Player'${id_player}''s inventory already exists`)
  }
  else {
    res.send(createdinventory)
  }
})

export default inventoryController
