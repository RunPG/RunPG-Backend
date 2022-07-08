import { Inventory } from '@prisma/client'
import { equipementBaseRepository, equipementRepository, inventoryRepository, itemRepository, userRepository } from '../repository'

export async function getById(id: number): Promise<Inventory | null> {
  return await inventoryRepository.getById(id)
}

export async function getByUserId(userId: number): Promise<Inventory[]> {
  return await inventoryRepository.getByUserId(userId)
}

export async function createEquipement(userId: number, equipementBaseId: number): Promise<Inventory | null> {
  if (await userRepository.getById(userId) == null || await equipementBaseRepository.getById(equipementBaseId) == null) {
    return null
  }

  // FIXME: Remove default stats
  const equipement = await equipementRepository.create(equipementBaseId, 1)

  return await inventoryRepository.createEquipement(userId, equipement.id)
}

export async function createItem(userId: number, itemId: number, stackSize: number): Promise<Inventory | null> {
  if (await userRepository.getById(userId) == null || await itemRepository.getById(itemId) == null) {
    return null
  }

  return await inventoryRepository.createItem(userId, itemId, stackSize)
}
