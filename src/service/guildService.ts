import { Guild } from '@prisma/client'
import { guildRepository, userRepository } from '../repository'

export async function getAll(): Promise<Guild[]> {
  return await guildRepository.getAll()
}

export async function getById(id: number): Promise<Guild | null> {
  return await guildRepository.getById(id)
}

export async function create(ownerId: number, name: string, description: string): Promise<Guild | null> {
  const user = await userRepository.getById(ownerId)
  if (user == null || await guildRepository.getByName(name) != null) {
    return null
  }

  const guild = await guildRepository.create(name, description)
  if (guild == null) {
    return null
  }

  await userRepository.joinGuild(ownerId, guild.id, true)

  return guild
}

export async function updateGuild(id: number, new_guild_values: Guild): Promise<Guild | null> {
  if (!await guildRepository.getById(id)) {
    return null
  }
  return await guildRepository.updateGuild(id, new_guild_values)
}
