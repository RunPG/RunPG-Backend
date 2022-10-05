import { Inventory, Statistics } from '@prisma/client'
import { equipementBaseRepository, equipementRepository, inventoryRepository, itemRepository, statisticsRepository, userRepository } from '../repository'

export async function getById(id: number): Promise<Inventory | null> {
  return await inventoryRepository.getById(id)
}

export async function getByUserId(userId: number): Promise<Inventory[]> {
  return await inventoryRepository.getByUserId(userId)
}

export async function createEquipement(userId: number, equipementBaseId: number, statistics: Statistics): Promise<Inventory | null> {
  if (await userRepository.getById(userId) == null || await equipementBaseRepository.getById(equipementBaseId) == null) {
    return null
  }

  const newStat = await statisticsRepository.create(statistics)

  const equipement = await equipementRepository.create(equipementBaseId, newStat.id)

  return await inventoryRepository.createEquipement(userId, equipement.id)
}

export async function createItem(userId: number, itemId: number, stackSize: number): Promise<Inventory | null> {
  if (await userRepository.getById(userId) == null || await itemRepository.getById(itemId) == null) {
    return null
  }

  return await inventoryRepository.createItem(userId, itemId, stackSize)
}

export async function updateQuantity(id: number, quantity: number): Promise<Inventory | null> {
  if (inventoryRepository.getById(id) == null) {
    return null
  }

  return await inventoryRepository.updateQuantity(id, quantity)
}
