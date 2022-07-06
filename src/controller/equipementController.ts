import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import EquipementInfo from '../objects/EquipementInfo'
import { equipementService } from '../service'

const equipementController = Router()

equipementController.get('/:id', async (req, res) => {
  /**
 * #swagger.summary = 'Get the equipement by id'
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
