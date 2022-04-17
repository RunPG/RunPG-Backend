import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userService } from '../service'

const userController = Router()

userController.get('/:name', async (req, res) => {
  let user
  try {
    user = await userService.getByName(req.params.name)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (user == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(user)
  }
})

export default userController
