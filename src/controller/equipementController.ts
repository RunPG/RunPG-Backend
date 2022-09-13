import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import EquipementInfo from '../objects/EquipementInfo'
import { equipementService } from '../service'

const equipementController = Router()

equipementController.get('/:id', async (req, res) => {
  /**
   * #swagger.summary = 'Get the equipement by id'
   * #swagger.responses[200] = { description: 'Equipement found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Id is not valid' }
   * #swagger.responses[404] = { description: 'Equipement not found' }
   */
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let equipementInfo: EquipementInfo | null
  try {
    equipementInfo = await equipementService.getById(id)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (equipementInfo == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(equipementInfo)
  }
})

export default equipementController
