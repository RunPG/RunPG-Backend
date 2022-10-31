import { Guild, PrismaPromise } from '@prisma/client'
import prisma from './client'

export function getAll(): PrismaPromise<Guild[]> {
  return prisma.guild.findMany()
}

export function getById(id: number): PrismaPromise<Guild | null> {
  return prisma.guild.findUnique({
    where: {
      id
    }
  })
}

export function getByName(name: string): PrismaPromise<Guild | null> {
  return prisma.guild.findUnique({
    where: {
      name
    }
  })
}

export function create(name: string, description: string): PrismaPromise<Guild | null> {
  return prisma.guild.create({
    data: {
      name,
      description
    }
  })
}

export function updateGuild(id: number, newGuildValues: Guild): PrismaPromise<Guild | null> {
  return prisma.guild.update({
    where: {
      id
    },
    data: newGuildValues
  })
}

export function remove(id: number): PrismaPromise<Guild> {
  return prisma.guild.delete({
    where: {
      id
    }
  })
}
