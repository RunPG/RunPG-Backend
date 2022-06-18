import { NotificationType } from '@prisma/client'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userService, notificationService } from '../service'

const userController = Router()

userController.get('/', async (_, res) => {
  /**
   * #swagger.summary = 'Get all users'
   */
  try {
    res.send(await userService.getAllUsers())
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
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
    user = await userService.getById(userId)
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

userController.get('/:userId/friend/:friendId', async (req, res) => {
  /**
   * #swagger.summary = 'Get one friend of an user'
   */
  let friend
  try {
    friend = await userService.getFriend(parseInt(req.params.userId), parseInt(req.params.friendId))
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (friend == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(friend)
  }
})

userController.get('/:userId/friend', async (req, res) => {
  /**
   * #swagger.summary = 'Get all friends of an user'
   */

  let friends
  try {
    friends = await userService.getAllFriends(parseInt(req.params.userId))
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (friends == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send({ friends: friends })
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
    if (await userService.incrementExperience(userId, xp)) {
      res.sendStatus(StatusCodes.OK)
    } else {
      res.status(StatusCodes.NOT_FOUND)
        .send(`User with id ${userId} not found`)
    }
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

userController.get('/:userId/notification', async (req, res) => {
  /**
   * #swagger.summary = 'Get all received notifications'
   */
  const userId: number = parseInt(req.params.userId)
  if (userId == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let notifications
  try {
    notifications = await notificationService.getAllNotifications(userId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (notifications == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(notifications)
  }
})

userController.get('/:userId/notification/:type', async (req, res) => {
  /**
   * #swagger.summary = 'Get all received notifications by type'
   */
  const userId: number = parseInt(req.params.userId)
  const type: string = req.params.type
  if (userId == null || type == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let notifType: NotificationType
  if (Object.values(NotificationType).some((col: string) => col === type)) {
    notifType = <NotificationType>type
  }
  else {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let notifications
  try {
    notifications = await notificationService.getAllNotificationsByType(userId, notifType)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (notifications == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(notifications)
  }
})

userController.get('/:userId/notification/:type/:senderId', async (req, res) => {
  /**
   * #swagger.summary = 'Get one specific received notification by type'
   */
  const userId: number = parseInt(req.params.userId)
  const senderId: number = parseInt(req.params.senderId)
  const type: string = req.params.type
  if (userId == null || type == null || senderId == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let notifType: NotificationType
  if (Object.values(NotificationType).some((col: string) => col === type)) {
    notifType = <NotificationType>type
  }
  else {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let notification
  try {
    notification = await notificationService.getNotification(userId, senderId, notifType)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (notification == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(notification)
  }
})

userController.post('/:userId/notification/:type/:senderId', async (req, res) => {
  /**
   * #swagger.summary = 'Create a notification'
   */
  const userId: number = parseInt(req.params.userId)
  const senderId: number = parseInt(req.params.senderId)
  const type: string = req.params.type
  if (userId == null || senderId == null || type == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let notifType: NotificationType
  if (Object.values(NotificationType).some((col: string) => col === type)) {
    notifType = <NotificationType>type
  }
  else {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let creatednotification
  try {
    creatednotification = await notificationService.create(userId, senderId, notifType)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (creatednotification == null) {
    res.status(StatusCodes.CONFLICT).send(`user with id '${userId}' notification already exists`)
  }
  else {
    res.send(creatednotification)
  }
})
userController.delete('/:userId/notification/:type/:senderId', async (req, res) => {
  /**
   * #swagger.summary = 'delete a notification'
   */
  const userId: number = parseInt(req.params.userId)
  const senderId: number = parseInt(req.params.senderId)
  const type: string = req.params.type
  if (userId == null || senderId == null || type == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let notifType: NotificationType
  if (Object.values(NotificationType).some((col: string) => col === type)) {
    notifType = <NotificationType>type
  }
  else {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let creatednotification
  try {
    creatednotification = await notificationService.deleteNotification(userId, senderId, notifType)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (creatednotification == null) {
    res.status(StatusCodes.CONFLICT).send(`user with id '${userId}' notification already exists`)
  }
  else {
    res.send(creatednotification)
  }
})
export default userController
