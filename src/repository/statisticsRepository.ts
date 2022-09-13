import { Statistics } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<Statistics | null> {
  return await prisma.statistics.findUnique({
    where: {
      id
    }
  })
}

export async function create(stats: Statistics): Promise<Statistics> {
  return await prisma.statistics.create({
    data: {
      level: stats.level,
      agility: stats.agility,
      defense: stats.defense,
      power: stats.power,
      precision: stats.precision,
      resistance: stats.resistance,
      strength: stats.strength,
      vitality: stats.vitality
    }
  })
}

export async function createOnlyOneValues(): Promise<Statistics> {
  return await prisma.statistics.create({
    data: {
      level: 1,
      agility: 1,
      defense: 1,
      power: 1,
      precision: 1,
      resistance: 1,
      strength: 1,
      vitality: 1
    }
  })
}
