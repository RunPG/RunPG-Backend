import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userService } from '../service'

const userController = Router()

userController.get('/', async (_, res) => {
  /**
   * #swagger.summary = 'Get all users'
   */
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
  /**
   * #swagger.summary = 'Get a user by his name'
   */
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

userController.get('/:userId', async (req, res) => {
  /**
   * #swagger.summary = 'Get a user by his id'
   */
  let userId
  try {
    userId = parseInt(req.params.userId)
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
  /**
   * #swagger.summary = 'Create a new user'
   */
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

userController.get('/:userId/friend', async (req, res) => {
  /**
   * #swagger.summary = 'Get all friends of an user'
   */
  let friends
  try {
    friends = await userService.getAllFriends(req.body.userId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (friends == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send({friends:friends})
  }
})

userController.post('/:userId/friend/:id', async (req, res) => {
  /**
   * #swagger.summary = 'Add a friend to an user'
   */
  const userId = Number(req.params.userId)
  const friendId = Number(req.params.id)

  if (userId == null || friendId == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let addedFriend
  try {
    addedFriend = await userService.addFriend(userId, friendId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (addedFriend == null) {
    res.status(StatusCodes.CONFLICT).send(`friend '${friendId}' already added`)
  }
  else {
    res.send(addedFriend)
  }
})

userController.post('/:userId/xp', async (req, res) => {
  /**
   * #swagger.summary = 'Update an user experience value'
   */
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
    await userService.incrementExperience(userId, xp)
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default userController
