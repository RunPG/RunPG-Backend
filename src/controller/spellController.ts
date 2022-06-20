import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { spellService } from '../service'

const spellController = Router()

spellController.get('/', async (_req, res) => {
  /**
   * #swagger.summary = 'Get all spells'
   */
  try {
    const users = await spellService.getAllSpells()
    res.send(users)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

spellController.get('/name/:name', async (req, res) => {
  /**
   * #swagger.summary = 'Get a spell by name'
   */
  let spell
  try {
    spell = await spellService.getByName(req.params.name)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (spell == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(spell)
  }
})

spellController.get('/:id', async (req, res) => {
  /**
   * #swagger.summary = 'Get a spell by id'
   */
  const spellId = Number(req.params.id)
  if (isNaN(spellId)) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let spell
  try {
    spell = await spellService.getById(spellId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (spell == null) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  }
  else {
    res.send(spell)
  }
})
/*
// FIXME: Useless route ?
spellController.post('/', async (req, res) => {
  /**
   * #swagger.summary = 'Create a new spell'
   */
/*
  const name = req.body.name
  const classId = req.body.classId
  if (name == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createdSpell
  try {
    createdSpell = await spellService.create(name, classId)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdSpell == null) {
    res.status(StatusCodes.CONFLICT).send(`Spell name '${name}' already exists`)
  }
  else {
    res.send(createdSpell)
  }
})*/

export default spellController
