import { prismaMock } from '../../../prismaMock'
import { userRepository } from '../../../repository'
import { User } from '@prisma/client'

/**
 * User repository unit test
 *
 * @group unit/repository/user
 */

test('should get user with id 1', async () => {
  const user: User = {
    id: 1,
    name: 'Gabriel',
    lastCaloriesUpdate: new Date(),
    guildId: null,
    characterId: null
  }

  prismaMock.user.findUnique.mockResolvedValue(user)

  const result = await userRepository.getById(1)

  expect(result).toBe(user)
})
