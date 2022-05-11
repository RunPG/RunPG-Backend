import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userService } from '../service'

const userController = Router()

userController.get('/', async (_req, res) => {
  let users
  try {
    users = await userService.getAllUsers()
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (users == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(users)
  }
})

userController.get('/name/:name', async (req, res) => {
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

userController.get('/:user_id', async (req, res) => {
  let userId
  try {
    userId = parseInt(req.params.user_id)
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let user
  try {
    user = await userService.getUserById(userId)
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

  let createduser
  try {
    createduser = await userService.create(name)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createduser == null) {
    res.status(StatusCodes.CONFLICT).send(`username '${name}' already exists`)
  }
  else {
    res.send(createduser)
  }
})

userController.get('/:user_id/friend', async (req, res) => {
  let friends
  try {
    friends = await userService.getAllFriends(req.body.user_id)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (friends == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(friends)
  }
})

userController.post('/:user_id/friend/:id', async (req, res) => {
  const user_id = Number(req.params.user_id)
  const friend_id = Number(req.params.id)

  if (user_id == null || friend_id == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let addedFriend
  try {
    addedFriend = await userService.addFriend(user_id, friend_id)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (addedFriend == null) {
    res.status(StatusCodes.CONFLICT).send(`friend '${friend_id}' already added`)
  }
  else {
    res.send(addedFriend)
  }
})

userController.post('/:userId/xp', async (req, res) => {
  let userId
  let xp
  try {
    userId = Number(req.params.userId)
    xp = Number(req.body.xp)
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  if (xp < 0) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    await userService.updateXP(userId, xp)
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})



export default userController
