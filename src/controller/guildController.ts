import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { guildService } from '../service'

const GuildController = Router()

GuildController.get('/', async (_, res) => {
  /**
   * #swagger.summary = 'Get all the guildes'
   */
  let guilds
  try {
    guilds = await guildService.getAll()
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (guilds == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(guilds)
  }
})
GuildController.get('/:guildId', async (req, res) => {
  /**
   * #swagger.summary = 'Get a guild by id'
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
   * #swagger.summary = 'create a guild'
   */
  const guild = req.body.guild
  if (guild == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let createdGuild
  try {
    createdGuild = await guildService.create(guild)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdGuild == null) {
    res.status(StatusCodes.CONFLICT).send('guild already exists')
  }
  else {
    res.status(StatusCodes.CREATED)
    res.send(createdGuild)
  }
})

GuildController.put('/:guildId', async (req, res) => {
  /**
   * #swagger.summary = 'Update a guild'
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
    res.status(StatusCodes.CONFLICT).send(('guild does not exist'))
  }
  else {
    res.send(createdGuild)
  }
})

export default GuildController
