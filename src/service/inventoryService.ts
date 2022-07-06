import { Inventory } from '@prisma/client'
import { inventoryRepository } from '../repository'

export async function getById(id: number): Promise<Inventory | null> {
  return await inventoryRepository.getById(id)
}

export async function getByUserId(userId: number): Promise<Inventory[]> {
  return await inventoryRepository.getByUserId(userId)
}

export async function create(userId: number): Promise<Inventory | null> {
  if (await inventoryRepository.getByUserId(userId) != null) {
    return null
  }
  return await inventoryRepository.create(userId)
}
