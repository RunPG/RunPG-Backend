import { guildRepository, userRepository } from '../../../repository'
import { guildService } from '../../../service'
import { guild1, guild1Info, guild2, user1 } from '../../testData'

/**
 * Guild service unit test
 *
 * @group unit/service/guild
 */

test('getById should return guild1 when guildRepository.getById returns guild1', async () => {
  guildRepository.getById = jest.fn(async () => {
    return guild1
  })

  userRepository.getMembersOfGuild = jest.fn(async () => {
    return []
  })

  const result = await guildService.getById(guild1.id)

  expect(result).toEqual(guild1Info)
  expect(guildRepository.getById).toBeCalledWith(guild1.id)
  expect(userRepository.getMembersOfGuild).toBeCalledWith(guild1.id)
})

test('getById should return null when guildRepository.getById returns null', async () => {
  guildRepository.getById = jest.fn(async () => {
    return null
  })

  const result = await guildService.getById(guild1.id)

  expect(result).toEqual(null)
  expect(guildRepository.getById).toBeCalledWith(guild1.id)
})

test('getById should throw when guildRepository.getById throws', async () => {
  guildRepository.getById = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await guildService.getById(guild1.id)
  }

  expect(call).rejects.toThrow()
  expect(guildRepository.getById).toBeCalledWith(guild1.id)
})

test('getAll should return an array of guilds when guildRepository.getAll returns an array', async () => {
  const expected = [guild1, guild2]
  guildRepository.getAll = jest.fn(async () => {
    return expected
  })

  const result = await guildService.getAll()

  expect(result).toEqual(expected)
})

test('getAll should throw when guildRepository.getAll throws', async () => {
  guildRepository.getAll = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await guildService.getAll()
  }

  await expect(call).rejects.toThrow()
})

test('create should return a guild when guildRepository.create return a guild', async () => {
  guildRepository.create = jest.fn(async () => {
    return guild1
  })

  userRepository.getById = jest.fn(async () => {
    return user1
  })

  const result = await guildService.create(1, guild1.name, guild1.description!)

  expect(result).toEqual(guild1)
  expect(guildRepository.create).toBeCalledWith(guild1.name, guild1.description)
})

test('create should throw when guildRepository.create throws', async () => {
  guildRepository.create = jest.fn(async () => {
    throw new Error()
  })

  userRepository.getById = jest.fn(async () => {
    return user1
  })

  const call = async (): Promise<void> => {
    await guildService.create(1, guild1.name, guild1.description!)
  }

  await expect(call).rejects.toThrow()
  expect(guildRepository.create).toBeCalledWith(guild1.name, guild1.description)
})

test('updateGuild should return the guild when it is updated', async () => {
  guildRepository.getById = jest.fn(async () => {
    return guild2
  })
  guildRepository.updateGuild = jest.fn(async () => {
    return guild2
  })

  const result = await guildService.updateGuild(guild2.id, guild1)

  expect(result).toEqual(guild2)
  expect(guildRepository.updateGuild).toBeCalledWith(guild2.id, guild1)
})


test('updateGuild should return null when the guild is not found', async () => {
  guildRepository.getById = jest.fn(async () => {
    return null
  })

  guildRepository.updateGuild = jest.fn(async () => {
    return guild2
  })

  const result = await guildService.updateGuild(guild2.id, guild1)

  expect(result).toEqual(null)
  expect(guildRepository.getById).toBeCalledWith(guild2.id)
  expect(guildRepository.updateGuild).not.toBeCalled()
})

test('updateGuild should throw when guildRepository.getById throws', async () => {
  guildRepository.getById = jest.fn(async () => {
    throw new Error()
  })

  guildRepository.updateGuild = jest.fn(async () => {
    return guild2
  })

  const call = async (): Promise<void> => {
    await guildService.updateGuild(guild2.id, guild1)
  }

  await expect(call).rejects.toThrow()
  expect(guildRepository.getById).toBeCalledWith(guild2.id)
  expect(guildRepository.updateGuild).not.toBeCalled()
})

test('updateGuild should throw when guildRepository.updateGuild throws', async () => {
  guildRepository.getById = jest.fn(async () => {
    return guild1
  })

  guildRepository.updateGuild = jest.fn(async () => {
    throw new Error()
  })

  const call = async (): Promise<void> => {
    await guildService.updateGuild(guild2.id, guild1)
  }

  await expect(call).rejects.toThrow()
  expect(guildRepository.getById).toBeCalledWith(guild2.id)
  expect(guildRepository.updateGuild).toBeCalledWith(guild2.id, guild1)
})
