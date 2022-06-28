import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../../app'
import { userService } from '../../../service'
import { user1 } from '../../testData'

const request = supertest(app)

/**
 * User controller unit test
 *
 * @group unit/controller/user
 */

test('GET a user by name should return the user returned by userService and code 200', async () => {
  userService.getByName = jest.fn(async () => {
    return user1
  })

  const result = await request.get(`/user/name/${user1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.id).toEqual(user1.id)
  expect(result.body.name).toEqual(user1.name)
  expect(result.body.characterId).toEqual(user1.characterId)
  expect(result.body.guildId).toEqual(user1.guildId)
  expect(result.body.lastCaloriesUpdate).toEqual(user1.lastCaloriesUpdate.toISOString())
})

test('GET a user by name should return null and code 404 when userService returns null', async () => {
  userService.getByName = jest.fn(async () => {
    return null
  })

  const result = await request.get(`/user/name/${user1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('GET a user by name should return null and code 500 when userService throws', async () => {
  userService.getByName = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.get(`/user/name/${user1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})

test('GET a user by id should return the user returned by userService and code 200', async () => {
  userService.getById = jest.fn(async () => {
    return user1
  })

  const result = await request.get(`/user/${user1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.id).toEqual(user1.id)
  expect(result.body.name).toEqual(user1.name)
  expect(result.body.characterId).toEqual(user1.characterId)
  expect(result.body.guildId).toEqual(user1.guildId)
  expect(result.body.lastCaloriesUpdate).toEqual(user1.lastCaloriesUpdate.toISOString())
})

test('GET a user by id should return null and code 404 when userService returns null', async () => {
  userService.getById = jest.fn(async () => {
    return null
  })

  const result = await request.get(`/user/${user1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('GET a user by id should return null and code 500 when userService throws', async () => {
  userService.getById = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.get(`/user/name/${user1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})


test('GET a user by id with wrong param should return null and code 400', async () => {
  const result = await request.get(`/user/${user1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(userService.getById).not.toBeCalled()
})

test('Create a user should return the new user and code 201', async () => {
  userService.create = jest.fn(async () => {
    return user1
  })

  const result = await request.post('/user')
    .send({ name: user1.name })

  expect(result.statusCode).toEqual(StatusCodes.CREATED)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.id).toEqual(user1.id)
  expect(result.body.name).toEqual(user1.name)
  expect(result.body.characterId).toEqual(user1.characterId)
  expect(result.body.guildId).toEqual(user1.guildId)
  expect(result.body.lastCaloriesUpdate).toEqual(user1.lastCaloriesUpdate.toISOString())
})

test('Create an already existing user should return nothing and code 409', async () => {
  userService.create = jest.fn(async () => {
    return null
  })

  const result = await request.post('/user')
    .send({ name: user1.name })

  expect(result.statusCode).toEqual(StatusCodes.CONFLICT)
  expect(result.body).toEqual({})
})

test('Create a user should return nothing and code 400 when their is no name given', async () => {
  const result = await request.post('/user')

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(userService.create).not.toBeCalled()
})

test('Create a user should return nothing and code 500 when userService throws', async () => {
  userService.create = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.post('/user')
    .send({ name: user1.name })

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 200 on success', async () => {
  userService.incrementExperience = jest.fn(async () => {
    return true
  })

  const result = await request.put(`/user/${user1.id}/xp`)
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 400 on parse userId error', async () => {
  const result = await request.put(`/user/${user1.name}/xp`)
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(userService.incrementExperience).not.toBeCalled()
})

test('Update user xp should return nothing and code 400 on parse xp error', async () => {
  const result = await request.put(`/user/${user1.id}/xp`)
    .send({ xp: 'test' })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(userService.incrementExperience).not.toBeCalled()
})


test('Update user xp should return nothing and code 400 on missing body', async () => {
  const result = await request.put(`/user/${user1.id}/xp`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(userService.incrementExperience).not.toBeCalled()
})

test('Update user xp should return nothing and code 400 when xp < 0', async () => {
  const result = await request.put(`/user/${user1.id}/xp`)
    .send({ xp: -1 })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
  expect(userService.incrementExperience).not.toBeCalled()
})

test('Update user xp should return nothing and code 404 when user does not exists', async () => {
  userService.incrementExperience = jest.fn(async () => {
    return false
  })

  const result = await request.put(`/user/${user1.id}/xp`)
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 500 when userService throws', async () => {
  userService.incrementExperience = jest.fn(async () => {
    throw new Error()
  })

  const result = await request.put(`/user/${user1.id}/xp`)
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(result.body).toEqual({})
})
