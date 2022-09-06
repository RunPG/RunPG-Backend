import { Equipement } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<Equipement | null> {
  return await prisma.equipement.findUnique({
    where: {
      id
    }
  })
}

export async function create(equipementBaseId: number, statisticsId: number): Promise<Equipement> {
  return await prisma.equipement.create({
    data: {
      equipementBaseId,
      statisticsId
    }
  })
}

export async function createMany(equipements: Equipement[]): Promise<void> {
  await prisma.equipement.createMany({
    data: equipements
  })
}
