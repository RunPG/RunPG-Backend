import { HeroClass, NotificationType } from '@prisma/client'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AlreadyInAGuildError } from '../exception/AlreadyInAGuildError'
import { userService, notificationService, inventoryService, characterService } from '../service'

const userController = Router()

userController.get('/', async (_, res) => {
  // #swagger.description = 'Get all users'
  try {
    res.send(await userService.getAllUsers())
    /* #swagger.responses[200] = {
    description: 'users successfully obtained',
  }*/
  }
  catch (error) {
    // #swagger.responses[500] = { description: 'Server encountered an internal error' }
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }
})

userController.get('/name/:name', async (req, res) => {
  /**
   * #swagger.summary = 'Get a user by his name'
  * #swagger.description = 'Get a user by his name'
  * #swagger.responses[200] = {
  description: 'User found',
  }
  * #swagger.responses[404] = { description: 'Could not find the user' }
  * #swagger.responses[500] = { description: 'wrong user name' }
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
   * #swagger.description = 'Get a user by id'
   * #swagger.responses[200] = {
     description: 'User found',
    }
   * #swagger.responses[404] = { description: 'Could not find the user' }
   * #swagger.responses[400] = { description: 'wrong user id' }
    }
  */

  const userId = parseInt(req.params.userId)
  if (isNaN(userId)) {
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
  * #swagger.description = 'Create a new user'
  * #swagger.parameters['name'] = {
  in: 'body',
  description: 'new user',
  required: true,
  }
  * #swagger.responses[200] = { description: 'User created' }
  * #swagger.responses[500] = { description: 'Server encountered an internal error' }
  * #swagger.responses[400] = { description: 'Request is not valid' }
  */
  const name = req.body.name
  const uid = req.body.uid
  const heroClass: HeroClass = req.body.heroClass as HeroClass
  if (name == null || uid == null || !Object.values(HeroClass).includes(req.body.heroClass)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createduser
  try {
    createduser = await userService.create(name, uid, heroClass)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createduser == null) {
    res.status(StatusCodes.CONFLICT).send(`${name}:${uid} already exists`)
  }
  else {
    res.status(StatusCodes.CREATED).send(createduser)
  }
})

userController.delete('/:userId',async (req, res) => {
  /**
  * #swagger.description = 'Delete a user'
  */
  const userId = Number(req.params.userId)
  if (isNaN(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let deleted = false
  try {
    deleted = await userService.deleteById(userId)
  }
  catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (deleted === false) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.sendStatus(StatusCodes.OK)
  }
})

userController.get('/:userId/friend/:friendId', async (req, res) => {
  /**
 * #swagger.description = 'Get a friend'
 * #swagger.responses[200] = {
   description: 'Friend found',
  }
 * #swagger.responses[500] = { description: 'Server encountered an internal error' }
 * #swagger.responses[400] = { description: 'no friend found' }
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
  * #swagger.description = 'Get all the friends'
  * #swagger.responses[200] = {
  description: 'Friends found',
  }
  * #swagger.responses[500] = { description: 'Server encountered an internal error' }
  * #swagger.responses[400] = { description: 'no friends found' }
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
 * #swagger.description = 'Add a new friend'
 * #swagger.responses[200] = {
   description: 'Friend added',
  }
 * #swagger.responses[500] = { description: 'Server encountered an internal error' }
 * #swagger.responses[400] = { description: 'Bad userId or id' }
 * #swagger.responses[409] = { description: 'This friend is already added !' }
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

userController.put('/:userId/xp', async (req, res) => {
  /**
  * #swagger.description = 'Modify user xp'
  * #swagger.parameters['xp'] = {
  in: 'body',
  description: 'new user xp',
  required: true,
  }
  * #swagger.responses[200] = { description: 'User xp modified'}
  * #swagger.responses[500] = { description: 'Server encountered an internal error' }
  * #swagger.responses[400] = { description: 'Bad userId or xp' }
  * #swagger.responses[404] = { description: 'User not found' }
  */
  const userId = Number(req.params.userId)
  const xp = Number(req.body.xp)
  if (isNaN(userId) || isNaN(xp)) {
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
  * #swagger.description = 'Get all user notifications'
  * #swagger.responses[200] = { description: 'Notifications found'}
  * #swagger.responses[500] = { description: 'Server encountered an internal error' }
  * #swagger.responses[400] = { description: 'Bad userId' }
  * #swagger.responses[404] = { description: 'Notifications not found' }
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
  * #swagger.description = 'Get all user notifications by type'
  * #swagger.responses[200] = { description: 'Notifications found'}
  * #swagger.responses[500] = { description: 'Server encountered an internal error' }
  * #swagger.responses[400] = { description: 'Bad userId or type' }
  * #swagger.responses[404] = { description: 'Notifications not found' }
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
   * #swagger.description = 'Get all user notifications by type'
   * #swagger.responses[200] = { description: 'Notifications found'}
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or type' }
   * #swagger.responses[404] = { description: 'Notifications not found' }
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
   * #swagger.description = 'Create a notification'
   * #swagger.responses[200] = { description: 'Notification created'}
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or type or senderId' }
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
   * #swagger.description = 'Delete a notification'
   * #swagger.responses[200] = { description: 'Notification deleted'}
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or type or senderId' }
   * #swagger.responses[404] = { description: 'notification does not exist' }
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
  let deletedNotification
  try {
    deletedNotification = await notificationService.deleteNotification(userId, senderId, notifType)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (deletedNotification == null) {
    res.status(StatusCodes.NOT_FOUND).send(`user with id '${userId}' notification does not exist`)
  }
  else {
    res.send(deletedNotification)
  }
})
export default userController

userController.post('/:userId/join/:guildId', async (req, res) => {
  /**
   * #swagger.summary = 'Join the guild'
   */
  const guildId = parseInt(req.params.guildId)
  const userId = parseInt(req.params.userId)
  if (isNaN(guildId) || isNaN(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let user
  try {
    user = await userService.joinGuild(userId, guildId)
  }
  catch (error) {
    if (error instanceof AlreadyInAGuildError) {
      res.sendStatus(StatusCodes.CONFLICT)
    }

    else { res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR) }
    return
  }


  if (user == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(user)
  }
})

userController.post('/:userId/inventory/equipement', async (req, res) => {
  /**
  * #swagger.summary = 'Give an equipement to an user'
  */
  const userId = Number(req.params.userId)
  const equipementBaseId = Number(req.body.equipementBaseId)
  if (isNaN(userId) || isNaN(equipementBaseId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let inventory
  try {
    inventory = await inventoryService.createEquipement(userId, equipementBaseId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (inventory == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(inventory)
  }
})

userController.post('/:userId/inventory/item', async (req, res) => {
  /**
  * #swagger.summary = 'Give items to an user'
  */
  const userId = Number(req.params.userId)
  const itemId = Number(req.body.itemId)
  const stackSize = Number(req.body.stackSize)
  if (isNaN(userId) || isNaN(itemId) || isNaN(stackSize) || stackSize < 1) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let inventory
  try {
    inventory = await inventoryService.createItem(userId, itemId, stackSize)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (inventory == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(inventory)
  }
})

userController.get('/:userId/character', async (req, res) => {
  /**
  * #swagger.summary = 'Get a character of an user'
  */
  const userId = Number(req.params.userId)
  if (isNaN(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let character
  try {
    character = await characterService.getByUserId(userId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (character == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(character)
  }
})
