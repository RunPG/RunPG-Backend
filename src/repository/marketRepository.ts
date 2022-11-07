import { Inventory, Market, PrismaPromise } from '@prisma/client'
import prisma from './client'

export function getAllOpenItems(): PrismaPromise<Market[]> {
  return prisma.market.findMany({
    where: {
      isSold: false
    }
  })
}

export function getOpenItemsOfEquipmentBase(equipmentBaseId: number): PrismaPromise<Market[]> {
  return prisma.market.findMany({
    where: {
      isSold: false,
      equipment: {
        id: equipmentBaseId
      }
    }
  })
}

export function getOpenItemsOfItem(itemId: number): PrismaPromise<Market[]> {
  return prisma.market.findMany({
    where: {
      isSold: false,
      itemId
    }
  })
}

export function getById(id: number): PrismaPromise<Market | null> {
  return prisma.market.findUnique({
    where: {
      id
    }
  })
}

export function createItem(inventory: Inventory, goldPrice: number, stackSize: number): PrismaPromise<Market> {
  return prisma.market.create({
    data: {
      sellerId: inventory.userId,
      itemId: inventory.itemId,
      equipmentId: inventory.equipmentId,
      goldPrice,
      stackSize
    }
  })
}

export function removeItem(id: number): PrismaPromise<Market> {
  return prisma.market.delete({
    where: {
      id
    }
  })
}

export function buyItem(id: number): PrismaPromise<Market> {
  return prisma.market.update({
    where: {
      id
    },
    data: {
      isSold: true
    }
  })
}

export function getByEquipmentBaseId(equipmentBaseId: number): PrismaPromise<Market[]> {
  return prisma.market.findMany({
    where: {
      equipment: {
        equipmentBaseId
      },
      isSold: false
    }
  })
}

export function getByItemId(itemId: number): PrismaPromise<Market[]> {
  return prisma.market.findMany({
    where: {
      itemId,
      isSold: false
    }
  })
}
