import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { playerService } from '../service'

const playerController = Router()

playerController.get('/:name', async (req, res) => {
  let player
  try {
    player = await playerService.getByName(req.params.name)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (player == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(player)
  }
})

playerController.post('/', async (req, res) => {
  const name = req.body.name
  if (name == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createdplayer
  try {
    createdplayer = await playerService.create(name)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdplayer == null) {
    res.status(StatusCodes.CONFLICT).send(`playername '${name}' already exists`)
  }
  else {
    res.send(createdplayer)
  }
})

playerController.get('/user/:user_id/friend/', async (req, res) => {
  let friends
  try {
    friends = await playerService.getAllFriends(req.body.user_id)
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

playerController.post('/user/:user_id/friend/:id', async (req, res) => {
  const user_id = req.body.user_id
  const friend_id = req.body.friend_id

  if (user_id == null || friend_id == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let addedFriend
  try {
    addedFriend = await playerService.addFriend(user_id,friend_id)
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

export default playerController
