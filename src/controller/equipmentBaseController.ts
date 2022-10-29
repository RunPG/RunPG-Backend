import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { equipmentBaseService } from '../service'

const equipmentBaseController = Router()

equipmentBaseController.get('/', async (req, res) => {
  /**
   * #swagger.summary = 'Get equipment base'
   * #swagger.parameters['id'] = {
       in: 'query',
       required: false,
       type: 'number',
       description: 'Optional id of equipment base to search for',
     }
   * #swagger.responses[200] = { description: 'Equipment base found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Id is not valid' }
   * #swagger.responses[404] = { description: 'Equipment base not found' }
   */
  const id = Number(req.query.id)
  if (req.query.id != null && isNaN(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    if (req.query.id != null) {
      const equipmentBase = await equipmentBaseService.getById(id)
      if (equipmentBase == null) {
        res.sendStatus(StatusCodes.NOT_FOUND)
      }
      else {
        res.send([equipmentBase])
      }
    }
    else {
      res.send(await equipmentBaseService.getAll())
    }
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default equipmentBaseController
