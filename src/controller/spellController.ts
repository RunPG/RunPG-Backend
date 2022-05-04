import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { spellService } from '../service'

const spellController = Router()

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
  const id_class = req.body.id_class
  if (name == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  let createdspell
  try {
    createdspell = await spellService.create(name,id_class)
  }
  catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  if (createdspell == null) {
    res.status(StatusCodes.CONFLICT).send(`spellname '${name}' already exists`)
  }
  else {
    res.send(createdspell)
  }
})

export default spellController
