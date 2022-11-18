import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { marketService } from '../service'

const marketController = Router()

marketController.get('/', async (_, res) => {
  /**
   * #swagger.summary = 'Get all market items'
   * #swagger.responses[200] = { description: 'Returns all market items' }
   * #swagger.responses[500] = { description: 'Internal server error' }
   */
  try {
    const markets = await marketService.getAllOpenItems()
    res.send(markets)
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

marketController.get('/:id', async (req, res) => {
  /**
   * #swagger.summary = 'Get a market item by id'
   * #swagger.responses[200] = { description: 'Returns the market item' }
   * #swagger.responses[404] = { description: 'Market item not found' }
   * #swagger.responses[400] = { description: 'Id is not a number' }
   * #swagger.responses[500] = { description: 'Internal server error' }
   */
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const market = await marketService.getItemById(id)
    if (market == null) {
      res.sendStatus(StatusCodes.NOT_FOUND)
    } else {
      res.send(market)
    }
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

marketController.delete('/:id', async (req, res) => {
  /**
   * #swagger.summary = 'Remove an item from the market'
   * #swagger.responses[204] = { description: 'Item was removed' }
   * #swagger.responses[404] = { description: 'Market item not found' }
   * #swagger.responses[400] = { description: 'Id is not a number' }
   * #swagger.responses[500] = { description: 'Internal server error' }
   */
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const deleted = await marketService.deleteItem(id)
    if (deleted) {
      res.sendStatus(StatusCodes.NOT_FOUND)
    } else {
      res.sendStatus(StatusCodes.NO_CONTENT)
    }
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

marketController.post('/', async (req, res) => {
  /**
   * #swagger.summary = 'Create a market item'
   * #swagger.responses[201] = { description: 'Market item created' }
   * #swagger.responses[400] = { description: 'Invalid body' }
   * #swagger.responses[404] = { description: 'Inventory not found or stackSize too big' }
   * #swagger.responses[500] = { description: 'Internal server error' }
   */
  const inventoryId = Number(req.body.inventoryId)
  const stackSize = Number(req.body.stackSize)
  const price = Number(req.body.price)
  if (!Number.isInteger(inventoryId) || !Number.isInteger(stackSize) || !Number.isInteger(price)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const createdMarket = await marketService.createItem(inventoryId, price, stackSize)

    if (createdMarket == null) {
      res.sendStatus(StatusCodes.NOT_FOUND)
    } else {
      res.status(StatusCodes.CREATED).send(createdMarket)
    }
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

marketController.post('/:id/buy', async (req, res) => {
  /**
   * #swagger.summary = 'Buy item from market'
   * #swagger.responses[204] = { description: 'Item bought' }
   * #swagger.responses[400] = { description: 'Invalid body' }
   * #swagger.responses[404] = { description: 'Item or buyer not found' }
   * #swagger.responses[409] = { description: 'Item already sold or buyer does not have enought gold' }
   * #swagger.responses[500] = { description: 'Internal server error' }
   */
  const id = Number(req.params.id)
  const buyerId = Number(req.body.buyerId)
  if (!Number.isInteger(id) || !Number.isInteger(buyerId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const bought = await marketService.buyItem(id, buyerId)
    if (bought == null) {
      res.sendStatus(StatusCodes.NOT_FOUND)
    } else if (bought) {
      res.sendStatus(StatusCodes.NO_CONTENT)
    } else {
      res.sendStatus(StatusCodes.CONFLICT)
    }
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

marketController.get('/equipmentBase/:id', async (req, res) => {
  /**
   * #swagger.summary = 'Get all market items by equipment base'
   * #swagger.responses[200] = { description: 'Returns all market items' }
   * #swagger.responses[400] = { description: 'id is not an integer' }
   * #swagger.responses[404] = { description: 'Equipment not found' }
   * #swagger.responses[500] = { description: 'Internal server error' }
   */
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const markets = await marketService.getByEquipmentBaseId(id)
    if (markets == null) {
      res.sendStatus(StatusCodes.NOT_FOUND)
    } else {
      res.send(markets)
    }
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

marketController.get('/item/:id', async (req, res) => {
  /**
   * #swagger.summary = 'Get all market items by item'
   * #swagger.responses[200] = { description: 'Returns all market items' }
   * #swagger.responses[400] = { description: 'id is not an integer' }
   * #swagger.responses[404] = { description: 'Item not found' }
   * #swagger.responses[500] = { description: 'Internal server error' }
   */
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const markets = await marketService.getByItemId(id)
    if (markets == null) {
      res.sendStatus(StatusCodes.NOT_FOUND)
    } else {
      res.send(markets)
    }
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default marketController
