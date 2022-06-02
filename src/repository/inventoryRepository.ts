import { Inventory } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<Inventory | null> {
  return await prisma.inventory.findUnique({
    where: {
      id
    }
  })
}

export async function getByUserId(userId: number): Promise<Inventory | null> {
  return await prisma.inventory.findFirst({
    where: {
      userId
    }
  })
}

// FIXME: Default values
export async function create(userId: number): Promise<Inventory | null> {
  return await prisma.inventory.create({
    data: {
      userId,
      stackSize: 0
    }
  })
}
