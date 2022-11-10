import { Inventory, PrismaPromise } from '@prisma/client'
import prisma from './client'

export function getById(id: number): PrismaPromise<Inventory | null> {
  return prisma.inventory.findUnique({
    where: {
      id
    }
  })
}

export function getByUserId(userId: number): PrismaPromise<Inventory[]> {
  return prisma.inventory.findMany({
    where: {
      userId
    }
  })
}

export function createEquipment(userId: number, equipmentId: number): PrismaPromise<Inventory> {
  return prisma.inventory.create({
    data: {
      userId,
      equipmentId,
      stackSize: 1
    }
  })
}

export function createItem(userId: number, itemId: number, stackSize: number): PrismaPromise<Inventory> {
  return prisma.inventory.create({
    data: {
      userId,
      itemId,
      stackSize
    }
  })
}

export function updateQuantity(id: number, quantity: number): PrismaPromise<Inventory> {
  return prisma.inventory.update({
    where: {
      id
    },
    data: {
      stackSize: quantity
    }
  })
}

export async function deleteByUserId(userId: number): Promise<void> {
  await prisma.inventory.deleteMany({
    where: {
      userId
    }
  })
}

export function getByUserIdAndItemId(userId: number, itemId: number): PrismaPromise<Inventory | null> {
  return prisma.inventory.findFirst({
    where: {
      userId,
      itemId
    }
  })
}

export function getByUserIdAndEquipmentId(userId: number, equipmentId: number): PrismaPromise<Inventory | null> {
  return prisma.inventory.findFirst({
    where: {
      userId,
      equipmentId
    }
  })
}
