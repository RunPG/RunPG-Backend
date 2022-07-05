import { Guild } from '@prisma/client'
import { guildRepository } from '../repository'

export async function getAll(): Promise<Guild[]> {
  return await guildRepository.getAll()
}

export async function getById(id: number): Promise<Guild | null> {
  return await guildRepository.getById(id)
}
export async function create(guild: Guild): Promise<Guild | null> {
  //TODO check if guild already exist by name
  return await guildRepository.create(guild)
}

export async function updateGuild(id: number, new_guild_values: Guild): Promise<Guild | null> {
  if (!await guildRepository.getById(id)) {
    return null
  }
  return await guildRepository.updateGuild(id, new_guild_values)
}
