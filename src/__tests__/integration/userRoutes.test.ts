import app from '../../app'
import supertest from 'supertest'
import prisma from '../../repository/client'
import { StatusCodes } from 'http-status-codes'

const request = supertest(app)

/**
 * User integration test
 *
 * @group integration/user
 */

beforeAll(async () => {
  await prisma.user.create({
    data: {
      id: 1,
      name: 'Gabriel'
    }
  })
})

afterAll(async () => {
  await prisma.user.deleteMany()

  await prisma.$disconnect()
})

it('GET user by its name should return the user', async () => {
  const userName = 'Gabriel'

  const getUserByName = await request.get(`/user/name/${userName}`)

  expect(getUserByName.statusCode).toEqual(StatusCodes.OK)
  expect(getUserByName.type).toEqual(expect.stringContaining('json'))
  expect(getUserByName.body.id).toBe(1)
  expect(getUserByName.body.name).toBe('Gabriel')
  expect(getUserByName.body.characterId).toBe(null)
  expect(getUserByName.body.guildId).toBe(null)
})
