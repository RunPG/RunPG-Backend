import { HeroClass, User } from '@prisma/client'
import { AlreadyInAGuildError } from '../../../exception/AlreadyInAGuildError'
import { characterRepository, equipementRepository, statisticsRepository, userRepository } from '../../../repository'
import { googleService, userService } from '../../../service'
import { character1, equipement1, guild1, statistics1, user1, user2 } from '../../testData'

/**
 * User service unit test
 *
 * @group unit/service/user
 */

test('getByName should return User1 when userRepository.getByName returns User1', async () => {
  userRepository.getByName = jest.fn(async () => {
    return user1
  })

  const result = await userService.getByName(user1.name)

  expect(result).toEqual(user1)
  expect(userRepository.getByName).toBeCalledWith(user1.name)
})

test('getByName should return null when userRepository.getByName returns null', async () => {
  userRepository.getByName = jest.fn(async () => {
    return null
  })

  const result = await userService.getByName(user1.name)

  expect(result).toEqual(null)
  expect(userRepository.getByName).toBeCalledWith(user1.name)
})

test('getByName should throw when userRepository.getByName throws', async () => {
  userRepository.getByName = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await userService.getByName(user1.name)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.getByName).toBeCalledWith(user1.name)
})

test('getById should return User1 when userRepository.getById returns User1', async () => {
  userRepository.getById = jest.fn(async () => {
    return user1
  })

  const result = await userService.getById(user1.id)

  expect(result).toEqual(user1)
  expect(userRepository.getById).toBeCalledWith(user1.id)
})

test('getById should return null when userRepository.getById returns null', async () => {
  userRepository.getById = jest.fn(async () => {
    return null
  })

  const result = await userService.getById(user1.id)

  expect(result).toEqual(null)
  expect(userRepository.getById).toBeCalledWith(user1.id)
})

test('getById should throw when userRepository.getById throws', async () => {
  userRepository.getById = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await userService.getById(user1.id)
  }

  expect(call).rejects.toThrow()
  expect(userRepository.getById).toBeCalledWith(user1.id)
})

test('getAllUsers should return an array of users when userRepository.getAllUsers returns an array', async () => {
  const expected = [user1, user2]
  userRepository.getAllUsers = jest.fn(async () => {
    return expected
  })

  const result = await userService.getAllUsers()

  expect(result).toEqual(expected)
})

test('getAllUsers should throw when userRepository.getAllUsers throws', async () => {
  userRepository.getAllUsers = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await userService.getAllUsers()
  }

  await expect(call).rejects.toThrow()
})

test('create should return a user when userRepository.getByName and getById return null', async () => {
  userRepository.getByName = jest.fn(async () => {
    return null
  })

  userRepository.getByUid = jest.fn(async () => {
    return null
  })

  characterRepository.create = jest.fn(async () => {
    return character1
  })

  userRepository.create = jest.fn(async () => {
    return user1
  })

  statisticsRepository.createOnlyOneValues = jest.fn(async () => {
    return statistics1
  })

  statisticsRepository.create = jest.fn(async () => {
    return statistics1
  })

  equipementRepository.create = jest.fn(async () => {
    return equipement1
  })

  googleService.authenticateUser = jest.fn(async () => {
    return user1.refreshToken
  })

  const result = await userService.create(user1.name, user1.uid, user1.mail, '', HeroClass.MAGE)

  expect(result).toEqual(user1)
  expect(userRepository.getByName).toBeCalledWith(user1.name)
  expect(userRepository.getByUid).toBeCalledWith(user1.uid)
  expect(userRepository.create).toBeCalledWith(user1.name, user1.uid, character1.id, user1.mail, user1.refreshToken)
})

test('create should return null when userRepository.getByName returns a user', async () => {
  userRepository.getByName = jest.fn(async () => {
    return user1
  })

  const result = await userService.create(user1.name, user1.uid, user1.mail, '', HeroClass.MAGE)

  expect(result).toEqual(null)
  expect(userRepository.getByName).toBeCalledWith(user1.name)
  expect(userRepository.create).not.toBeCalled()
})

test('create should throw when userRepository.getByName throws', async () => {
  userRepository.getByName = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await userService.create(user1.name, user2.uid, user1.mail, '', HeroClass.MAGE)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.create).not.toBeCalled()
})

test('create should return null when userRepository.getByUid returns a user', async () => {
  userRepository.getByName = jest.fn(async () => {
    return null
  })

  userRepository.getByUid = jest.fn(async () => {
    return user1
  })

  const result = await userService.create(user1.name, user1.uid, user1.mail, '', HeroClass.MAGE)

  expect(result).toEqual(null)
  expect(userRepository.getByName).toBeCalledWith(user1.name)
  expect(userRepository.getByUid).toBeCalledWith(user1.uid)
  expect(userRepository.create).not.toBeCalled()
})

test('create should throw when userRepository.getByUid throws', async () => {
  userRepository.getByUid = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await userService.create(user1.name, user1.uid, user1.mail, '', HeroClass.MAGE)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.create).not.toBeCalled()
})

test('updateExperience should return true when the value is updated', async () => {
  const xp = 42

  userRepository.getById = jest.fn(async () => {
    return user1
  })

  userRepository.incrementExperience = jest.fn(async () => {
    return
  })

  googleService.getCalories = jest.fn(async () => {
    return xp
  })

  const result = await userService.updateExperience(user1.id)

  expect(result).toEqual(true)
  expect(userRepository.getById).toBeCalledWith(user1.id)
  expect(userRepository.incrementExperience).toBeCalledWith(user1.id, xp)
})


test('updateExperience should return false when the user is not found', async () => {
  userRepository.getById = jest.fn(async () => {
    return null
  })

  userRepository.incrementExperience = jest.fn(async () => {
    return
  })

  googleService.getCalories = jest.fn(async () => {
    return 0
  })

  const result = await userService.updateExperience(user1.id)

  expect(result).toEqual(false)
  expect(userRepository.getById).toBeCalledWith(user1.id)
  expect(userRepository.incrementExperience).not.toBeCalled()
})

test('updateExperience should throw when userRepository.getById throws', async () => {
  userRepository.getById = jest.fn(async () => {
    throw new Error()
  })

  userRepository.incrementExperience = jest.fn(async () => {
    return
  })

  googleService.getCalories = jest.fn(async () => {
    return 0
  })

  const call = async (): Promise<void> => {
    await userService.updateExperience(user1.id)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.getById).toBeCalledWith(user1.id)
  expect(userRepository.incrementExperience).not.toBeCalled()
})

test('updateExperience should throw when userRepository.incrementExperience throws', async () => {
  const xp = 42

  userRepository.getById = jest.fn(async () => {
    return user1
  })

  userRepository.incrementExperience = jest.fn(async () => {
    throw new Error()
  })

  googleService.getCalories = jest.fn(async () => {
    return xp
  })

  const call = async (): Promise<void> => {
    await userService.updateExperience(user1.id)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.getById).toBeCalledWith(user1.id)
  expect(userRepository.incrementExperience).toBeCalledWith(user1.id, xp)
})

test('joinGuild should make the user join the guild and return it', async () => {
  userRepository.joinGuild = jest.fn(async () => {
    return user2
  })

  const result = await userService.joinGuild(user2.id, guild1.id)

  expect(result).toEqual(user2)
  expect(userRepository.joinGuild).toBeCalledWith(user2.id, guild1.id)
})

test('joinGuild should return null since the user does not exist', async () => {
  userRepository.joinGuild = jest.fn(async () => {
    return null
  })

  const result = await userService.joinGuild(user2.id, guild1.id)

  expect(result).toEqual(null)
  expect(userRepository.joinGuild).toBeCalledWith(user2.id, guild1.id)
})

test('joinGuild should throw since userRepository.joinGuild does', async () => {
  userRepository.joinGuild = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<User | null> => {
    return await userService.joinGuild(user2.id, guild1.id)
  }

  await expect(call).rejects.toThrow()
})

test('joinGuild should throw since the user already has a guild', async () => {
  userRepository.joinGuild = jest.fn(async () => {
    throw new AlreadyInAGuildError()
  })

  const call = async (): Promise<User | null> => {
    return await userService.joinGuild(user2.id, guild1.id)
  }

  await expect(call).rejects.toThrow(AlreadyInAGuildError)
})
