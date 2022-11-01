import { PrismaPromise, Statistics } from '@prisma/client'
import prisma from './client'

export function getById(id: number): PrismaPromise<Statistics | null> {
  return prisma.statistics.findUnique({
    where: {
      id
    }
  })
}

export function create(stats: Statistics): PrismaPromise<Statistics> {
  return prisma.statistics.create({
    data: {
      level: stats.level,
      defense: stats.defense,
      power: stats.power,
      precision: stats.precision,
      resistance: stats.resistance,
      strength: stats.strength,
      vitality: stats.vitality
    }
  })
}

export function createOnlyOneValues(): PrismaPromise<Statistics> {
  return prisma.statistics.create({
    data: {
      level: 1,
      defense: 1,
      power: 1,
      precision: 1,
      resistance: 1,
      strength: 1,
      vitality: 1
    }
  })
}
