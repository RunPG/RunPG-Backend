import { inventory } from '@prisma/client'
import { inventoryRepository } from '../repository'

export async function getById(id: number): Promise<inventory | null> {
  return await inventoryRepository.getById(id)
}
export async function getByuserId(id_user: number): Promise<inventory | null> {
  return await inventoryRepository.getByuserId(id_user)
}
export async function create(id_user: number): Promise<inventory | null> {
  if (await inventoryRepository.getByuserId(id_user) != null) {
    return null
  }
  return await inventoryRepository.create(id_user)
}
