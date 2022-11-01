import { EquipmentBase, PrismaPromise } from '@prisma/client'
import prisma from './client'

export function getAll(): PrismaPromise<EquipmentBase[]> {
  return prisma.equipmentBase.findMany()
}

export function getById(id: number): PrismaPromise<EquipmentBase | null> {
  return prisma.equipmentBase.findUnique({
    where: {
      id
    }
  })
}
