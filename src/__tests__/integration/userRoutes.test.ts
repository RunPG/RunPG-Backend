import app from '../../app'
import supertest from 'supertest'
import prisma from '../../repository/client'

const requestWithSupertest = supertest(app)

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

it('GET user by is should return the user', async () => {
  const userId = 'Gabriel'

  const user = await requestWithSupertest.get(`/user/name/${userId}`)

  expect(user.status).toEqual(200)
  expect(user.type).toEqual(expect.stringContaining('json'))
  expect(user.body).toHaveProperty('id')
  expect(user.body).toHaveProperty('name')
})
