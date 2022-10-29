import { Equipment } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<Equipment | null> {
  return await prisma.equipment.findUnique({
    where: {
      id
    }
  })
}

export async function create(equipmentBaseId: number, statisticsId: number): Promise<Equipment> {
  return await prisma.equipment.create({
    data: {
      equipmentBaseId,
      statisticsId
    }
  })
}

export async function createMany(equipments: Equipment[]): Promise<void> {
  await prisma.equipment.createMany({
    data: equipments
  })
}
