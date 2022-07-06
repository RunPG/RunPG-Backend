import { EquipementBase } from '@prisma/client'
import { equipementBaseRepository } from '../repository'

export async function getAll(): Promise<EquipementBase[]> {
  return await equipementBaseRepository.getAll()
}
