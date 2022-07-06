import { EquipementBase } from '@prisma/client'
import prisma from './client'

export async function getAll(): Promise<EquipementBase[]> {
  return await prisma.equipementBase.findMany()
}

export async function getById(id: number): Promise<EquipementBase | null> {
  return await prisma.equipementBase.findUnique({
    where: {
      id
    }
  })
}
