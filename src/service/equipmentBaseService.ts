import { EquipmentBase } from '@prisma/client'
import { equipmentBaseRepository } from '../repository'

export async function getAll(): Promise<EquipmentBase[]> {
  return equipmentBaseRepository.getAll()
}

export async function getById(id: number): Promise<EquipmentBase | null> {
  return equipmentBaseRepository.getById(id)
}
