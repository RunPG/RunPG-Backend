import { User } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../../app'
import { userService } from '../../../service'

const request = supertest(app)

/**
 * User controller unit test
 *
 * @group unit/controller/user
 */

it('Get a user by name', async () => {
  const expected: User = {
    id: 1,
    name: 'Test',
    characterId: null,
    guildId: null,
    lastCaloriesUpdate: new Date()
  }

  userService.getByName = jest.fn(async () => {
    return expected
  })

  const getUserByName = await request.get(`/user/name/${expected.name}`)

  expect(getUserByName.statusCode).toEqual(StatusCodes.OK)
  expect(getUserByName.type).toEqual(expect.stringContaining('json'))
  expect(getUserByName.body.id).toBe(expected.id)
  expect(getUserByName.body.name).toBe(expected.name)
  expect(getUserByName.body.characterId).toBe(expected.characterId)
  expect(getUserByName.body.guildId).toBe(expected.guildId)
  expect(getUserByName.body.lastCaloriesUpdate).toBe(expected.lastCaloriesUpdate.toISOString())
})
