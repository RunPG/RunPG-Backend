import { Equipement } from '@prisma/client'
import { equipementRepository } from '../repository'

export async function getById(id: number): Promise<Equipement | null> {
  return await equipementRepository.getById(id)
}
