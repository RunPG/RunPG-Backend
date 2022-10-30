import { Inventory, Statistics } from '@prisma/client'
import { equipmentBaseRepository, equipmentRepository, inventoryRepository, itemRepository, statisticsRepository, userRepository } from '../repository'

export async function getById(id: number): Promise<Inventory | null> {
  return await inventoryRepository.getById(id)
}

export async function getByUserId(userId: number): Promise<Inventory[]> {
  return await inventoryRepository.getByUserId(userId)
}

export async function createEquipment(userId: number, equipmentBaseId: number, statistics: Statistics): Promise<Inventory | null> {
  if (await userRepository.getById(userId) == null || await equipmentBaseRepository.getById(equipmentBaseId) == null) {
    return null
  }

  const newStat = await statisticsRepository.create(statistics)

  const equipment = await equipmentRepository.create(equipmentBaseId, newStat.id)

  return await inventoryRepository.createEquipment(userId, equipment.id)
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
