import { spell } from '@prisma/client'
import { spellRepository } from '../repository'

export async function getById(id: number): Promise<spell | null> {
  return await spellRepository.getById(id)
}
export async function getByName(name: string): Promise<spell | null> {
    return await spellRepository.getByName(name)
  }
export async function create(name: string, id_class: number): Promise<spell | null> {
  if (await spellRepository.getByName(name) != null) {
    return null
  }

  return await spellRepository.create(name,id_class)
}
