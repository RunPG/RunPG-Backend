import { userRepository } from '../../../repository'
import { userService } from '../../../service'
import { user1, user2 } from '../../testData'

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

test('create should return a user when userRepository.getByName return null', async () => {
  userRepository.getByName = jest.fn(async () => {
    return null
  })

  userRepository.create = jest.fn(async () => {
    return user1
  })

  const result = await userService.create(user1.name)

  expect(result).toEqual(user1)
  expect(userRepository.getByName).toBeCalledWith(user1.name)
  expect(userRepository.create).toBeCalledWith(user1.name)
})

test('create should return null when userRepository.getByName returns a user', async () => {
  userRepository.getByName = jest.fn(async () => {
    return user1
  })

  const result = await userService.create(user1.name)

  expect(result).toEqual(null)
  expect(userRepository.getByName).toBeCalledWith(user1.name)
  expect(userRepository.create).not.toBeCalled()
})

test('create should throw when userRepository.getByName throws', async () => {
  userRepository.getByName = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await userService.create(user1.name)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.create).not.toBeCalled()
})

test('create should throw when userRepository.create throws', async () => {
  userRepository.getByName = jest.fn(async () => {
    return null
  })

  userRepository.create = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await userService.create(user1.name)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.getByName).toBeCalledWith(user1.name)
})

test('incrementExperience should return true when the value is updated',async () => {
  const xp = 42

  userRepository.getById = jest.fn(async () => {
    return user1
  })

  userRepository.incrementExperience = jest.fn(async () => {
    return
  })

  const result = await userService.incrementExperience(user1.id, xp)

  expect(result).toEqual(true)
  expect(userRepository.getById).toBeCalledWith(user1.id)
  expect(userRepository.incrementExperience).toBeCalledWith(user1.id, xp)
})


test('incrementExperience should return false when the user is not found',async () => {
  const xp = 42

  userRepository.getById = jest.fn(async () => {
    return null
  })

  userRepository.incrementExperience = jest.fn(async () => {
    return
  })

  const result = await userService.incrementExperience(user1.id, xp)

  expect(result).toEqual(false)
  expect(userRepository.getById).toBeCalledWith(user1.id)
  expect(userRepository.incrementExperience).not.toBeCalled()
})

test('incrementExperience should throw when userRepository.getById throws',async () => {
  const xp = 42

  userRepository.getById = jest.fn(async () => {
    throw new Error()
  })

  userRepository.incrementExperience = jest.fn(async () => {
    return
  })

  const call = async (): Promise<void> => {
    await userService.incrementExperience(user1.id, xp)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.getById).toBeCalledWith(user1.id)
  expect(userRepository.incrementExperience).not.toBeCalled()
})

test('incrementExperience should throw when userRepository.incrementExperience throws',async () => {
  const xp = 42

  userRepository.getById = jest.fn(async () => {
    return user1
  })

  userRepository.incrementExperience = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await userService.incrementExperience(user1.id, xp)
  }

  await expect(call).rejects.toThrow()
  expect(userRepository.getById).toBeCalledWith(user1.id)
  expect(userRepository.incrementExperience).toBeCalledWith(user1.id, xp)
})
