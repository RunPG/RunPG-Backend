import { inventory } from '@prisma/client'
import { inventoryRepository } from '../repository'

export async function getById(id: number): Promise<inventory | null> {
  return await inventoryRepository.getById(id)
}
export async function getByPlayerId(id_player: number): Promise<inventory | null> {
    return await inventoryRepository.getByPlayerId(id_player)
  }
export async function create(id_player: number): Promise<inventory | null> {
  if (await inventoryRepository.getByPlayerId(id_player) != null) {
    return null
  }
  return await inventoryRepository.create(id_player)
}
