import { HeroClass, NotificationType, Statistics } from '@prisma/client'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AlreadyInAGuildError } from '../exception/AlreadyInAGuildError'
import Resources from '../objects/Resources'
import { userService, notificationService, inventoryService, characterService, activityService } from '../service'

const userController = Router()

userController.get('/', async (_, res) => {
  /**
   * #swagger.summary = 'Get all users'
   * #swagger.responses[200] = { description: 'Users successfully obtained' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
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
   * #swagger.summary = 'Get a user by name'
   * #swagger.responses[200] = { description: 'User found' }
   * #swagger.responses[404] = { description: 'Could not find the user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
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

userController.get('/mail/:mail', async (req, res) => {
  /**
   * #swagger.summary = 'Get a user by mail'
   * #swagger.responses[200] = { description: 'User found' }
   * #swagger.responses[404] = { description: 'Could not find the user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */
  let user
  try {
    user = await userService.getByMail(req.params.mail)
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
   * #swagger.summary = 'Get a user by id'
   * #swagger.responses[200] = { description: 'User found' }
   * #swagger.responses[404] = { description: 'Could not find the user' }
   * #swagger.responses[400] = { description: 'Wrong user id' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
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
   * #swagger.summary = 'Create a new user'
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
  const mail = req.body.mail
  const serverSideAccessCode = req.body.serverSideAccessCode
  const heroClass: HeroClass = req.body.heroClass as HeroClass
  if (name == null || uid == null || mail == null || serverSideAccessCode == null || !Object.values(HeroClass).includes(req.body.heroClass)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createduser
  try {
    createduser = await userService.create(name, uid, mail, serverSideAccessCode, heroClass)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createduser == null) {
    res.status(StatusCodes.CONFLICT).send(`${name} with ${uid} already exists`)
  }
  else {
    res.status(StatusCodes.CREATED).send(createduser)
  }
})

userController.delete('/:userId',async (req, res) => {
  /**
   * #swagger.summary = 'Delete a user'
   * #swagger.responses[200] = { description: 'User deleted' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Request is not valid' }
   * #swagger.responses[404] = { desctiption: 'User not found' }
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
   * #swagger.summary = 'Get a friend'
   * #swagger.responses[200] = { description: 'Friend found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Friend not found' }
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
   * #swagger.summary = 'Get all the friends'
   * #swagger.responses[200] = { description: 'Friends found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[404] = { description: 'User not found' }
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

userController.post('/:userId/friend/:friendId', async (req, res) => {
  /**
   * #swagger.summary = 'Add a new friend'
   * #swagger.responses[200] = { description: 'Friend added' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or id' }
   * #swagger.responses[409] = { description: 'This friend is already added' }
   */
  const userId = Number(req.params.userId)
  const friendId = Number(req.params.friendId)

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

userController.delete('/:userId/friend/:friendId', async (req, res) => {
  /**
   * #swagger.summary = 'Remove a friend'
   * #swagger.responses[200] = { description: 'Friend removed' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or friendId' }
   * #swagger.responses[404] = { description: 'Friendship not found' }
   */
  const userId = Number(req.params.userId)
  const friendId = Number(req.params.friendId)

  if (userId == null || friendId == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let removed = false
  try {
    removed = await userService.removeFriend(userId, friendId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (removed === false) {
    res.status(StatusCodes.NOT_FOUND).send('Friendship not found')
  }
  else {
    res.sendStatus(StatusCodes.OK)
  }
})

userController.put('/:userId/xp', async (req, res) => {
  /**
   * #swagger.summary = 'Modify user xp'
   * #swagger.responses[200] = { description: 'User xp updated' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId' }
   * #swagger.responses[404] = { description: 'User not found' }
   */
  const userId = Number(req.params.userId)
  if (isNaN(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    if (await userService.updateExperience(userId)) {
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
   * #swagger.summary = 'Get all user notifications'
   * #swagger.responses[200] = { description: 'Notifications found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId' }
   * #swagger.responses[404] = { description: 'User not found' }
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
   * #swagger.summary = 'Get all user notifications by type'
   * #swagger.responses[200] = { description: 'Notifications found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or type' }
   * #swagger.responses[404] = { description: 'User not found' }
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
   * #swagger.summary = 'Get all user notifications by type'
   * #swagger.responses[200] = { description: 'Notifications found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or type' }
   * #swagger.responses[404] = { description: 'User not found' }
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
   * #swagger.responses[200] = { description: 'Notification created' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId, type or senderId' }
   * #swagger.responses[409] = { description: 'Notification already exists' }
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
   * #swagger.summary = 'Delete a notification'
   * #swagger.responses[200] = { description: 'Notification deleted' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId, type or senderId' }
   * #swagger.responses[404] = { description: 'Notification does not exist' }
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
   * #swagger.responses[200] = { description: 'User successfully added to guild' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or guildId' }
   * #swagger.responses[404] = { description: 'User or guild does not exists' }
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

userController.delete('/:userId/guild', async (req, res) => {
  /**
   * #swagger.summary = 'Leave the guild'
   * #swagger.responses[200] = { description: 'User successfully removed from the guild' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId' }
   * #swagger.responses[404] = { description: 'User does not exists' }
   */
  const userId = parseInt(req.params.userId)
  if (!Number.isInteger(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let leaved
  try {
    leaved = await userService.leaveGuild(userId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (leaved == false) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.sendStatus(StatusCodes.OK)
  }
})

userController.post('/:userId/inventory/equipment', async (req, res) => {
  /**
   * #swagger.summary = 'Give an equipment to an user'
   * #swagger.responses[200] = { description: 'Equipment successfully added to user inventory' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId or equipmentBaseId' }
   * #swagger.responses[404] = { description: 'User or equipment base does not exist' }
   */
  const userId = Number(req.params.userId)
  const equipmentBaseId = Number(req.body.equipmentBaseId)
  const level = Number(req.body.statistics.level)
  const vitality = Number(req.body.statistics.vitality)
  const strength = Number(req.body.statistics.strength)
  const defense = Number(req.body.statistics.defense)
  const power = Number(req.body.statistics.power)
  const resistance = Number(req.body.statistics.resistance)
  const precision = Number(req.body.statistics.precision)

  if (isNaN(userId) || isNaN(equipmentBaseId) || !Number.isInteger(level) || !Number.isInteger(vitality) || !Number.isInteger(strength)
     || !Number.isInteger(defense) || !Number.isInteger(power) || !Number.isInteger(resistance) || !Number.isInteger(precision)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  const statistics: Statistics = {
    id: 0,
    level,
    vitality,
    strength,
    defense,
    power,
    resistance,
    precision
  }

  let inventory
  try {
    inventory = await inventoryService.createEquipment(userId, equipmentBaseId, statistics)
  }
  catch (error) {
    console.log(error)
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
   * #swagger.summary = 'Give item(s) to an user'
   * #swagger.responses[200] = { description: 'Items(s) successfully added to user inventory' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId, itemId or stackSize' }
   * #swagger.responses[404] = { description: 'User or item does not exist' }
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
   * #swagger.responses[200] = { description: 'User character found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Bad userId' }
   * #swagger.responses[404] = { description: 'User does not exist' }
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

userController.get('/:userId/inventory', async (req, res) => {
  /**
   * #swagger.summary = 'Get the inventory of an user'
   * #swagger.responses[200] = { description: 'User inventoy found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'userId is not valid' }
   * #swagger.responses[404] = { description: 'User does not exist' }
   */
  const userId = Number(req.params.userId)
  if (isNaN(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let inventory
  try {
    inventory = await inventoryService.getByUserId(userId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  // TODO: Not found never triggers, and is the user doesn't exists, the array will be empty
  if (inventory == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(inventory)
  }
})

userController.post('/:userId/activity/:activityId', async (req, res) => {
  /**
   * #swagger.summary = 'Post a user activity'
   * #swagger.responses[200] = { description: 'Activity noted' }
   * #swagger.responses[400] = { description: 'userId is not a number' }
   * #swagger.responses[404] = { description: 'Could not find user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */

  const userId = parseInt(req.params.userId)
  const activityId = req.params.activityId
  if (isNaN(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let result
  try {
    result = await activityService.create(userId, activityId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (result == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(result)
  }
})

userController.get('/:userId/activity/:activityId', async (req, res) => {
  /**
   * #swagger.summary = 'Get time since last access'
   * #swagger.responses[200] = { description: 'Activity found' }
   * #swagger.responses[400] = { description: 'userId is not a number' }
   * #swagger.responses[404] = { description: 'Could not find user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */

  const userId = parseInt(req.params.userId)
  const activityId = req.params.activityId
  if (isNaN(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let result: number | null = null
  try {
    result = await activityService.isUserAuthorized(userId, activityId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (result == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send({ lastAccess: result })
  }
})

userController.post('/:userId/levelup', async (req, res) => {
  /**
   * #swagger.summary = 'Level up an user'
   * #swagger.responses[200] = { description: 'User updated' }
   * #swagger.responses[400] = { description: 'userId or stat is not a number' }
   * #swagger.responses[404] = { description: 'Could not find user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */

  const userId = Number(req.params.userId)
  const statistics: Statistics = {
    id: req.body.id,
    level: req.body.level,
    vitality: req.body.vitality,
    strength: req.body.strength,
    defense: req.body.defense,
    power: req.body.power,
    resistance: req.body.resistance,
    precision: req.body.precision
  }
  if (!Number.isInteger(userId) || !Number.isInteger(statistics.level) || !Number.isInteger(statistics.vitality) || !Number.isInteger(statistics.strength) || !Number.isInteger(statistics.defense)
    || !Number.isInteger(statistics.power) || !Number.isInteger(statistics.resistance) || !Number.isInteger(statistics.precision) || !Number.isInteger(statistics.id)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let result
  try {
    result = await userService.levelUpUser(userId, statistics)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (result == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(result)
  }
})

userController.post('/:userId/resources', async (req, res) => {
  /**
   * #swagger.summary = 'Update resources of an user'
   * #swagger.responses[200] = { description: 'User updated' }
   * #swagger.responses[400] = { description: 'userId or resources is not a number' }
   * #swagger.responses[404] = { description: 'Could not find user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */

  const userId = Number(req.params.userId)
  const resources: Resources = {
    gold: req.body.gold,
    crystal: req.body.crystal
  }
  if (!Number.isInteger(userId) || !Number.isInteger(resources.gold) || !Number.isInteger(resources.crystal)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let result
  try {
    result = await userService.updateResources(userId, resources)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (result == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(result)
  }
})

userController.get('/:userId/caloriesToday', async (req, res) => {
  /**
   * #swagger.summary = 'Get calories for today'
   * #swagger.responses[200] = { description: 'User updated' }
   * #swagger.responses[400] = { description: 'userId is not a number' }
   * #swagger.responses[404] = { description: 'Could not find user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */

  const userId = Number(req.params.userId)
  if (!Number.isInteger(userId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let calories
  try {
    calories = await userService.getTodayCalories(userId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (calories == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send({ calories })
  }
})

userController.post('/:userId/equiped', async (req, res) => {
  /**
   * #swagger.summary = 'Update user equiped equipments'
   * #swagger.responses[200] = { description: 'User updated' }
   * #swagger.responses[400] = { description: 'userId is not a number' }
   * #swagger.responses[404] = { description: 'Could not find user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */

  const userId = Number(req.params.userId)
  const helmetId = Number(req.body.helmetId)
  const chestplateId = Number(req.body.chestplateId)
  const glovesId = Number(req.body.glovesId)
  const leggingsId = Number(req.body.leggingsId)
  const weaponId = Number(req.body.weaponId)
  if (!Number.isInteger(userId) || !Number.isInteger(helmetId) || !Number.isInteger(chestplateId)
     || !Number.isInteger(glovesId) || !Number.isInteger(leggingsId) || !Number.isInteger(weaponId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let updated
  try {
    updated = await userService.updateEquiped(userId, helmetId, chestplateId, glovesId, leggingsId, weaponId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (updated == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(updated)
  }
})

userController.post('/:userId/xp', async (req, res) => {
  /**
   * #swagger.summary = 'Add xp to a user'
   * #swagger.responses[200] = { description: 'User updated' }
   * #swagger.responses[400] = { description: 'userId is not a number' }
   * #swagger.responses[404] = { description: 'Could not find user' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */

  const userId = Number(req.params.userId)
  const xp = Number(req.body.xp)
  if (!Number.isInteger(userId) || !Number.isInteger(xp)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let updated
  try {
    updated = await userService.incrementExperienceManually(userId, xp)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (updated == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(updated)
  }
})
