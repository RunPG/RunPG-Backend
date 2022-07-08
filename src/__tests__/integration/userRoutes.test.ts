import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../app'
import prisma from '../../repository/client'
import { user1, user3 } from '../testData'
import { clearDatabase, seedDatabase } from './database'

const request = supertest(app)

/**
 * User endpoints test
 *
 * @group integration/user
 */

afterEach(async () => {
  await clearDatabase()
})

test('GET a user by name should return the user returned by userService and code 200', async () => {
  await seedDatabase()

  const result = await request.get(`/user/name/${user1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.id).toEqual(user1.id)
  expect(result.body.name).toEqual(user1.name)
  expect(result.body.uid).toEqual(user1.uid)
  expect(result.body.characterId).toEqual(user1.characterId)
  expect(result.body.guildId).toEqual(user1.guildId)
  expect(result.body.lastCaloriesUpdate).toEqual(user1.lastCaloriesUpdate.toISOString())
})

test('GET a user by name should return null and code 404 when userService returns null', async () => {
  await seedDatabase()

  const result = await request.get('/user/name/youhou')

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('GET a user by id should return the user returned by userService and code 200', async () => {
  await seedDatabase()

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
  await seedDatabase()

  const result = await request.get('/user/42')

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('GET a user by id with wrong param should return null and code 400', async () => {
  const result = await request.get(`/user/${user1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

// test('Create a user should return the new user and code 201', async () => {
//   await seedDatabase()

//   const result = await request.post('/user')
//     .send({ name: 'test', uid: 'test', heroClass: HeroClass.MAGE })

//   expect(result.statusCode).toEqual(StatusCodes.CREATED)
//   expect(result.type).toEqual(expect.stringContaining('json'))
//   expect(result.body.name).toEqual('test')
//   expect(result.body.characterId).toEqual(characters.length + 1)
// })

test('Create an already existing user should return nothing and code 409', async () => {
  await seedDatabase()

  const result = await request.post('/user')
    .send({ name: user1.name, uid: user1.uid, heroClass: 'MAGE' })

  expect(result.statusCode).toEqual(StatusCodes.CONFLICT)
  expect(result.body).toEqual({})
})

test('Create a user should return nothing and code 400 when their is no data given', async () => {
  const result = await request.post('/user')

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

// TODO: Check update
test('Update user xp should return nothing and code 200 on success', async () => {
  await seedDatabase()

  const result = await request.put(`/user/${user3.id}/xp`)
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual({})

  const xp = await prisma.character.findUnique({
    where: {
      id: 1
    }
  })

  expect(xp?.experience).toEqual(1337 + 50)
})

test('Update user xp should return nothing and code 400 on parse userId error', async () => {
  const result = await request.put(`/user/${user3.name}/xp`)
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 400 on parse xp error', async () => {
  const result = await request.put(`/user/${user3.id}/xp`)
    .send({ xp: 'test' })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})


test('Update user xp should return nothing and code 400 on missing body', async () => {
  const result = await request.put(`/user/${user3.id}/xp`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 400 when xp < 0', async () => {
  const result = await request.put(`/user/${user3.id}/xp`)
    .send({ xp: -1 })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 404 when user does not exists', async () => {
  await seedDatabase()

  const result = await request.put('/user/42/xp')
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})
