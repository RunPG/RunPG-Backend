import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../app'
import { spell1, spells } from '../testData'
import { clearDatabase, seedDatabase } from './database'

const request = supertest(app)

/**
 * User endpoints test
 *
 * @group integration/spell
 */

afterEach(async () => {
  await clearDatabase()
})

test('Get all spells should return all spells and code 200 when success', async () => {
  await seedDatabase()

  const result = await request.get('/spell')

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual(spells)
})

test('Get spell by id should return the spell and code 200 when success', async () => {
  await seedDatabase()

  const result = await request.get(`/spell/${spell1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual(spell1)
})

test('Get spell by id should return nothing and code 404 when the spell is not found', async () => {
  await seedDatabase()

  const result = await request.get('/spell/42')

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('Get spell by id should return nothing and code 400 when the id is not a number', async () => {
  await seedDatabase()

  const result = await request.get(`/spell/${spell1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Get spell by name should return the spell and code 200 when success', async () => {
  await seedDatabase()

  const result = await request.get(`/spell/name/${spell1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual(spell1)
})

test('Get spell by name should return nothing and code 404 when the spell is not found', async () => {
  await seedDatabase()

  const result = await request.get(`/spell/name/${spell1.name}a`)

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('Get spell by name should return nothing and code 400 when no name is given', async () => {
  const result = await request.get('/spell/name/')

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})
