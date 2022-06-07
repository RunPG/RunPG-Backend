// jest.mock('../../../repository/userRepository.ts')
import { userRepository } from '../../../repository'
import { userService } from '../../../service'
import { User } from '@prisma/client'

/**
 * User service unit test
 *
 * @group unit/service/user
 */
test('Get a user by name', async () => {
  const expected : User = {
    id: 1,
    name: 'Test',
    characterId: null,
    guildId: null,
    lastCaloriesUpdate: new Date()
  }

  userRepository.getByName = jest.fn(async () => {
    return expected
  })

  const user = await userService.getByName('Test')

  expect(user).toBe(expected)
})
