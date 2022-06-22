import { Guild } from '@prisma/client'
import prisma from './client'

export async function getAll(): Promise<Guild[]> {
  return await prisma.guild.findMany()
}

export async function getById(id: number): Promise<Guild | null> {
  return await prisma.guild.findUnique({
    where: {
      id
    }
  })
}

export async function create(guild: Guild): Promise<Guild | null> {
  return await prisma.guild.create({ data: guild })
}

export async function updateGuild(id: number, newGuildValues: Guild): Promise<Guild | null> {
  return await prisma.guild.update({
    where: {
      id
    },
    data: newGuildValues
  })
}
