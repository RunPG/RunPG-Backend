import { Guild } from '@prisma/client'
import GuildInfo from '../objects/GuildInfo'
import GuildMember from '../objects/GuildMember'
import { guildRepository, userRepository } from '../repository'

export async function getAll(): Promise<Guild[]> {
  return await guildRepository.getAll()
}

export async function getById(id: number): Promise<GuildInfo | null> {
  const guild = await guildRepository.getById(id)
  if (guild == null) {
    return null
  }

  const members = await userRepository.getMembersOfGuild(id)

  return {
    id,
    name: guild.name,
    description: guild.description,
    members: members.map((member): GuildMember => {
      return {
        id: member.id,
        name: member.name,
        isOwner: member.isGuildOwner,
        heroClass: member.character!.heroClass,
        level: member.character!.statistics.level
      }
    })
  }
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
  return guildRepository.updateGuild(id, new_guild_values)
}
