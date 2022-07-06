import { Statistics } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<Statistics | null> {
  return await prisma.statistics.findUnique({
    where: {
      id
    }
  })
}
