import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userService } from '../service'

const userController = Router()

userController.get('/:name', async (req, res) => {
  const user = await userService.getByName(req.params.name)

  if (user == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(user)
  }
})

export default userController
