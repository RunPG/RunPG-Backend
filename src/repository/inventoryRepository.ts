import { Inventory } from '@prisma/client'
import prisma from './client'

export async function getById(id: number): Promise<Inventory | null> {
  return await prisma.inventory.findUnique({
    where: {
      id
    }
  })
}

export async function getByUserId(userId: number): Promise<Inventory[]> {
  return await prisma.inventory.findMany({
    where: {
      userId
    }
  })
}

export async function createEquipement(userId: number, equipementId: number): Promise<Inventory> {
  return await prisma.inventory.create({
    data: {
      userId,
      equipementId,
      stackSize: 1
    }
  })
}

export async function createItem(userId: number, itemId: number, stackSize: number): Promise<Inventory> {
  return await prisma.inventory.create({
    data: {
      userId,
      itemId,
      stackSize
    }
  })
}
