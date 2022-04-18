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

userController.post('/', async (req, res) => {
  const name = req.body.name
  if (name == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createdUser
  try {
    createdUser = await userService.create(name)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdUser == null) {
    res.status(StatusCodes.CONFLICT).send(`Username '${name}' already exists`)
  }
  else {
    res.send(createdUser)
  }
})

export default userController
