import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../../app'
import { guildService } from '../../../service'
import { guild1, guild2 } from '../../testData'

const request = supertest(app)

/**
 * User controller unit test
 *
 * @group unit/controller/guild
 */

test('GET a guild by id should return the guild returned by guildService and code 200', async () => {
  guildService.getById = jest.fn(async () => {
    return guild1
  })

  const result = await request.get(`/guild/${guild1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.id).toEqual(guild1.id)
  expect(result.body.name).toEqual(guild1.name)
  expect(result.body.ownerId).toEqual(guild1.ownerId)
})

test('GET a guild by id should return null and code 404 when guildService returns null', async () => {
  guildService.getById = jest.fn(async () => {
    return null
  })

  const result = await request.get(`/guild/${guild1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('GET a guild by id should return null and code 500 when guildService throws', async () => {
  guildService.getById = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.get(`/guild/${guild1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})


test('GET a guild by id with wrong param should return null and code 400', async () => {
  const result = await request.get(`/guild/${guild1.name}`).send({ guild: guild1 })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(guildService.getById).not.toBeCalled()
})

test('Create a guild should return the new guild and code 201', async () => {
  guildService.create = jest.fn(async () => {
    return guild1
  })

  const result = await request.post('/guild')
    .send({ guild: guild1 })

  expect(result.statusCode).toEqual(StatusCodes.CREATED)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.id).toEqual(guild1.id)
  expect(result.body.name).toEqual(guild1.name)
  expect(result.body.ownerId).toEqual(guild1.ownerId)
})

test('Create an already existing guild should return nothing and code 409', async () => {
  guildService.create = jest.fn(async () => {
    return null
  })

  const result = await request.post('/guild')
    .send({ guild: guild1 })

  expect(result.statusCode).toEqual(StatusCodes.CONFLICT)
  expect(result.body).toEqual({})
})

test('Create a guild should return nothing and code 400 when there is no guild given', async () => {
  const result = await request.post('/guild')

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(guildService.create).not.toBeCalled()
})

test('Create a guild should return nothing and code 500 when guildService throws', async () => {
  guildService.create = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.post('/guild')
    .send({ guild: guild1 })

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})

test('Update guild should return the guild modified and code 200 on success', async () => {
  guildService.updateGuild = jest.fn(async () => {
    return guild2
  })

  const result = await request.put(`/guild/${guild2.id}`)
    .send({ newGuildValues: guild1 })

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual(
    {
      'description': 'description guild2',
      'id': 2,
      'name': 'guild2',
      'ownerId': 2
    })
})

test('Update guild should return nothing and code 400 on parse guildId error', async () => {
  const result = await request.put('/guild/NaN')
    .send({ newGuildValues: guild1 })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(guildService.updateGuild).not.toBeCalled()
})

test('Update guild should return nothing and code 400 on parse newGuildValues error', async () => {
  const result = await request.put(`/guild/${guild2.id}`)
    .send(guild1)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(guildService.updateGuild).not.toBeCalled()
})


test('Update guild should return nothing and code 400 on missing body', async () => {
  const result = await request.put(`/guild/${guild2.id}`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(guildService.updateGuild).not.toBeCalled()
})

test('Update guild should return nothing and code 404 when guild does not exists', async () => {
  guildService.updateGuild = jest.fn(async () => {
    return null
  })

  const result = await request.put(`/guild/${guild2.id}`)
    .send({ newGuildValues: guild1 })

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('Update guild should return nothing and code 500 when guildService throws', async () => {
  guildService.updateGuild = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.put(`/guild/${guild2.id}`)
    .send({ newGuildValues: guild1 })

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})
