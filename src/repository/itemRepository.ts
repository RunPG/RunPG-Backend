import { Item, PrismaPromise } from '@prisma/client'
import prisma from './client'

export function getById(id: number): PrismaPromise<Item | null> {
  return prisma.item.findUnique({
    where: {
      id
    }
  })
}

export function getAll(): PrismaPromise<Item[]> {
  return prisma.item.findMany()
}
