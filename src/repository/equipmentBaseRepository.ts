import { EquipmentBase } from '@prisma/client'
import prisma from './client'

export async function getAll(): Promise<EquipmentBase[]> {
  return await prisma.equipmentBase.findMany()
}

export async function getById(id: number): Promise<EquipmentBase | null> {
  return await prisma.equipmentBase.findUnique({
    where: {
      id
    }
  })
}
