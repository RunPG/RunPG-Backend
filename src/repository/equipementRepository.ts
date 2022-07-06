import { Equipement } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<Equipement | null> {
  return await prisma.equipement.findUnique({
    where: {
      id
    }
  })
}
