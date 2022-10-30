import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import EquipmentInfo from '../objects/EquipmentInfo'
import { equipmentService } from '../service'

const equipmentController = Router()

equipmentController.get('/:id', async (req, res) => {
  /**
   * #swagger.summary = 'Get the equipment by id'
   * #swagger.responses[200] = { description: 'Equipment found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Id is not valid' }
   * #swagger.responses[404] = { description: 'Equipment not found' }
   */
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let equipmentInfo: EquipmentInfo | null
  try {
    equipmentInfo = await equipmentService.getById(id)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (equipmentInfo == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(equipmentInfo)
  }
})

export default equipmentController
