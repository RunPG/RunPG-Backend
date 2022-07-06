import { Item } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<Item | null> {
  return await prisma.item.findUnique({
    where: {
      id
    }
  })
}
