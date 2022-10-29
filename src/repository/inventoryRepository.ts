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

export async function createEquipment(userId: number, equipmentId: number): Promise<Inventory> {
  return await prisma.inventory.create({
    data: {
      userId,
      equipmentId,
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

export async function updateQuantity(id: number, quantity: number): Promise<Inventory> {
  return await prisma.inventory.update({
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
