import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { guildService } from '../service'

const GuildController = Router()

GuildController.get('/', async (_, res) => {
  /**
   * #swagger.summary = 'Get all the guildes'
   * #swagger.responses[200] = { description: 'Guilds found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   */
  let guilds
  try {
    guilds = await guildService.getAll()
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }
  res.send(guilds)
})

GuildController.get('/:guildId', async (req, res) => {
  /**
   * #swagger.summary = 'Get a guild by id'
   * #swagger.responses[200] = { description: 'Guild found' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'guildId is not valid' }
   * #swagger.responses[404] = { description: 'Guild not found' }
   */
  const guildId = parseInt(req.params.guildId)

  if (isNaN(guildId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let Guild
  try {
    Guild = await guildService.getById(guildId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (Guild == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(Guild)
  }
})

GuildController.post('/', async (req, res) => {
  /**
   * #swagger.summary = 'Create a guild'
   * #swagger.responses[201] = { description: 'Guild created' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Guild body is not valid' }
   * #swagger.responses[409] = { description: 'Guild already exists' }
   */
  const ownerId = req.body.ownerId
  const name = req.body.name
  const description = req.body.description
  if (name == null || description == null || !Number.isInteger(ownerId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createdGuild
  try {
    createdGuild = await guildService.create(ownerId, name, description)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdGuild == null) {
    res.status(StatusCodes.CONFLICT).send('Guild already exists')
  }
  else {
    res.status(StatusCodes.CREATED)
    res.send(createdGuild)
  }
})

GuildController.put('/:guildId', async (req, res) => {
  /**
   * #swagger.summary = 'Update a guild'
   * #swagger.responses[200] = { description: 'Guild updated' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   * #swagger.responses[400] = { description: 'Guild body or id is not valid' }
   * #swagger.responses[404] = { description: 'Guild does not exists' }
   */
  const newGuildValues = req.body.newGuildValues
  const guildId = parseInt(req.params.guildId)

  if (newGuildValues == null || isNaN(guildId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let createdGuild
  try {
    createdGuild = await guildService.updateGuild(guildId, newGuildValues)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdGuild == null) {
    res.status(StatusCodes.NOT_FOUND).send(('Guild does not exist'))
  }
  else {
    res.send(createdGuild)
  }
})

export default GuildController
