import { EquipementBase } from '@prisma/client'
import { equipementBaseRepository } from '../repository'

export async function getAll(): Promise<EquipementBase[]> {
  return await equipementBaseRepository.getAll()
}

export async function getById(id: number): Promise<EquipementBase | null> {
  return await equipementBaseRepository.getById(id)
}
