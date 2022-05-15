import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { spellService } from '../service'

const spellController = Router()

spellController.get('/', async (_req, res) => {
  let users
  try {
    users = await spellService.getAllSpells()
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

spellController.get('/:name', async (req, res) => {
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
  let spell
  try {
    spell = await spellService.getById(Number(req.params.id))
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

spellController.post('/', async (req, res) => {
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
})

export default spellController
