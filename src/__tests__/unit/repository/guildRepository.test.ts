import { prismaMock } from '../../../prismaMock'
import { guildRepository } from '../../../repository'
import { Guild } from '@prisma/client'
import { guild1, guild2 } from '../../testData'

/**
 * Guild repository unit test
 *
 * @group unit/repository/guild
 */

test('getAll should return guilds array when there is 2 guilds', async () => {
  const expected = [guild1, guild2]

  prismaMock.guild.findMany.mockResolvedValue(expected)

  const result = await guildRepository.getAll()

  expect(result).toEqual(expected)
})

test('getAllshould get return empty array when there is no guild', async () => {
  const expected: Guild[] = []

  prismaMock.guild.findMany.mockResolvedValue(expected)

  const result = await guildRepository.getAll()

  expect(result).toEqual(expected)
})

test('getById should return guild1 when asked 1 and 1 exists', async () => {
  prismaMock.guild.findUnique.mockResolvedValue(guild1)

  const result = await guildRepository.getById(guild1.id)

  expect(result).toEqual(guild1)
  expect(prismaMock.guild.findUnique).toBeCalledWith({ where: { id: guild1.id } })
})

test('getById should return guild null when asked 1 and 1 does not exists', async () => {
  prismaMock.guild.findUnique.mockResolvedValue(null)

  const result = await guildRepository.getById(guild1.id)

  expect(result).toEqual(null)
  expect(prismaMock.guild.findUnique).toBeCalledWith({ where: { id: guild1.id } })
})

test('create should create a new guild when asked to create one called guild2', async () => {
  prismaMock.guild.create.mockResolvedValue(guild2)

  const result = await guildRepository.create(guild2.name, guild2.description!)

  expect(result).toEqual(guild2)
  expect(prismaMock.guild.create).toBeCalledWith({ data: guild2 })
})

test('create should throw when asked to create guild2 that already exists', async () => {
  prismaMock.guild.create.mockRejectedValue(new Error())

  const call = async (): Promise<Guild | null> => await guildRepository.create(guild2.name, guild2.description!)

  expect(call).rejects.toThrow()
  expect(prismaMock.guild.create).toBeCalledWith({ data: guild2 })
})
