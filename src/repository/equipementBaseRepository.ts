import { EquipementBase } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<EquipementBase | null> {
  return await prisma.equipementBase.findUnique({
    where: {
      id
    }
  })
}
