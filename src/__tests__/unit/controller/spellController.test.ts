import { Spell } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../../app'
import { spellService } from '../../../service'
import { spell1, spell2 } from '../../data'

const request = supertest(app)

/**
 * Spell controller unit test
 *
 * @group unit/controller/spell
 */

test('Get all spells should return all spells and code 200 when success', async () => {
  const expected: Spell[] = [spell1, spell2]

  spellService.getAllSpells = jest.fn(async () => {
    return expected
  })

  const result = await request.get('/spell')

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual(expected)
})

test('Get all spells should return nothing and code 500 when userService throws', async () => {
  spellService.getAllSpells = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.get('/spell')

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})

test('Get all spells should return all spells and code 200 when success', async () => {
  const expected: Spell[] = [spell1, spell2]

  spellService.getAllSpells = jest.fn(async () => {
    return expected
  })

  const result = await request.get('/spell')

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual(expected)
})

test('Get all spells should return nothing and code 500 when userService throws', async () => {
  spellService.getAllSpells = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.get('/spell')

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})

test('Get spell by id should return the spell and code 200 when success', async () => {
  spellService.getById = jest.fn(async () => {
    return spell1
  })

  const result = await request.get(`/spell/${spell1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual(spell1)
})

test('Get spell by id should return nothing and code 500 when userService throws', async () => {
  spellService.getById = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.get(`/spell/${spell1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})

test('Get spell by id should return nothing and code 404 when the spell is not found', async () => {
  spellService.getById = jest.fn(async () => {
    return null
  })

  const result = await request.get(`/spell/${spell1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('Get spell by id should return nothing and code 400 when the id is not a number', async () => {
  const result = await request.get(`/spell/${spell1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Get spell by name should return the spell and code 200 when success', async () => {
  spellService.getByName = jest.fn(async () => {
    return spell1
  })

  const result = await request.get(`/spell/name/${spell1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual(spell1)
})

test('Get spell by name should return nothing and code 500 when userService throws', async () => {
  spellService.getByName = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.get(`/spell/name/${spell1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})

test('Get spell by name should return nothing and code 404 when the spell is not found', async () => {
  spellService.getByName = jest.fn(async () => {
    return null
  })

  const result = await request.get(`/spell/name/${spell1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('Get spell by name should return nothing and code 400 when no name is given', async () => {
  const result = await request.get('/spell/name/')

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})
