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

export async function getByName(name: string): Promise<Guild | null> {
  return await prisma.guild.findUnique({
    where: {
      name
    }
  })
}

export async function create(name: string, description: string): Promise<Guild | null> {
  return await prisma.guild.create({
    data: {
      name,
      description
    }
  })
}

export async function updateGuild(id: number, newGuildValues: Guild): Promise<Guild | null> {
  return await prisma.guild.update({
    where: {
      id
    },
    data: newGuildValues
  })
}

export async function remove(id: number): Promise<void> {
  await prisma.guild.delete({
    where: {
      id
    }
  })
}
