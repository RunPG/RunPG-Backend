import { Equipment, PrismaPromise } from '@prisma/client'
import prisma from './client'

export function getById(id: number): PrismaPromise<Equipment | null> {
  return prisma.equipment.findUnique({
    where: {
      id
    }
  })
}

export function create(equipmentBaseId: number, statisticsId: number): PrismaPromise<Equipment> {
  return prisma.equipment.create({
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
