import { Spell } from '@prisma/client'
import { spellRepository } from '../repository'

export async function getAllSpells(): Promise<Spell[]> {
  return await spellRepository.getAllSpells()
}

export async function getById(id: number): Promise<Spell | null> {
  return await spellRepository.getById(id)
}

export async function getByName(name: string): Promise<Spell | null> {
  return await spellRepository.getByName(name)
}
/*
export async function create(name: string, classId: number): Promise<Spell | null> {
  if (await spellRepository.getByName(name) != null) {
    return null
  }

  return await spellRepository.create(name, classId)
}*/
