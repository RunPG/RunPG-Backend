import { EquipmentBase } from '@prisma/client'
import { equipmentBaseRepository } from '../repository'

export async function getAll(): Promise<EquipmentBase[]> {
  return await equipmentBaseRepository.getAll()
}

export async function getById(id: number): Promise<EquipmentBase | null> {
  return await equipmentBaseRepository.getById(id)
}
