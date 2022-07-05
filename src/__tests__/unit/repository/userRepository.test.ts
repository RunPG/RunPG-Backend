import { prismaMock } from '../../../prismaMock'
import { userRepository } from '../../../repository'
import { User } from '@prisma/client'
import { guild1, user1, user2 } from '../../testData'
import { AlreadyInAGuildError } from '../../../exception/AlreadyInAGuildError'

/**
 * User repository unit test
 *
 * @group unit/repository/user
 */

test('getAllUsers should return users array when there is 2 users', async () => {
  const expected = [user1, user2]

  prismaMock.user.findMany.mockResolvedValue(expected)

  const result = await userRepository.getAllUsers()

  expect(result).toEqual(expected)
})

test('getAllUsers should get return empty array when there is no user', async () => {
  const expected: User[] = []

  prismaMock.user.findMany.mockResolvedValue(expected)

  const result = await userRepository.getAllUsers()

  expect(result).toEqual(expected)
})

test('getByName should return User1 when asked User1 and User1 exists', async () => {
  prismaMock.user.findUnique.mockResolvedValue(user1)

  const result = await userRepository.getByName(user1.name)

  expect(result).toEqual(user1)
  expect(prismaMock.user.findUnique).toBeCalledWith({ where: { name: user1.name } })
})

test('getByName should return null when asked User1 and User1 does not exists', async () => {
  prismaMock.user.findUnique.mockResolvedValue(null)

  const result = await userRepository.getByName(user1.name)

  expect(result).toEqual(null)
  expect(prismaMock.user.findUnique).toBeCalledWith({ where: { name: user1.name } })
})

test('getById should return User1 when asked 1 and 1 exists', async () => {
  prismaMock.user.findUnique.mockResolvedValue(user1)

  const result = await userRepository.getById(user1.id)

  expect(result).toEqual(user1)
  expect(prismaMock.user.findUnique).toBeCalledWith({ where: { id: user1.id } })
})

test('getById should return user null when asked 1 and 1 does not exists', async () => {
  prismaMock.user.findUnique.mockResolvedValue(null)

  const result = await userRepository.getById(user1.id)

  expect(result).toEqual(null)
  expect(prismaMock.user.findUnique).toBeCalledWith({ where: { id: user1.id } })
})

test('create should create a new user with name User2 when asked to create one with name User2', async () => {
  prismaMock.user.create.mockResolvedValue(user2)

  const result = await userRepository.create(user2.name)

  expect(result).toEqual(user2)
  expect(prismaMock.user.create).toBeCalledWith({ data: { name: user2.name } })
})

test('create should throw when asked to create User2 that already exists', async () => {
  prismaMock.user.create.mockRejectedValue(new Error())

  const call = async (): Promise<User> => await userRepository.create(user2.name)

  expect(call).rejects.toThrow()
  expect(prismaMock.user.create).toBeCalledWith({ data: { name: user2.name } })
})

test('join a guild should return the user that just joined the guild', async () => {
  prismaMock.user.findUnique.mockResolvedValue(user2)
  prismaMock.user.update.mockResolvedValue(user2)

  const result = await userRepository.joinGuild(user2.id, guild1.id)

  expect(result).toEqual(user2)
  expect(prismaMock.user.update).toBeCalledWith({
    where: {
      id: 2
    },
    data: {
      guildId: 1
    }
  })
})

test('join a guild should return null because the user does not exist', async () => {
  prismaMock.user.findUnique.mockResolvedValue(null)
  prismaMock.user.update.mockResolvedValue(user2)
  const result = await userRepository.joinGuild(user2.id, guild1.id)
  expect(result).toEqual(null)
})

test('join a guild should throw a AlreadyInAGuildError because the user already has a guild', async () => {
  prismaMock.user.findUnique.mockResolvedValue(user1)
  prismaMock.user.update.mockResolvedValue(user1)

  const call = async (): Promise<User | null> => await userRepository.joinGuild(user1.id, guild1.id)

  expect(call).rejects.toThrow(AlreadyInAGuildError)

})
// test('incrementExperience should call user.update with new date and new xp value', async () => {
//   const xp = 50

//   await userRepository.incrementExperience(user1.id, xp)

//   expect(prismaMock.user.update).toBeCalledWith({
//     where: {
//       id: user1.id
//     },
//     data: {
//       character: {
//         update: {
//           experience: {
//             increment: xp
//           }
//         }
//       },
//       lastCaloriesUpdate: new Date()
//     }
//   })
// })
