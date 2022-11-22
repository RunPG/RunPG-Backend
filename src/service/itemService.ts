import { Item } from '@prisma/client'
import { itemRepository } from '../repository'

export async function getAll(): Promise<Item[]> {
  return itemRepository.getAll()
}

export async function getById(id: number): Promise<Item | null> {
  return itemRepository.getById(id)
}
