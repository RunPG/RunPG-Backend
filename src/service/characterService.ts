import { Character } from '@prisma/client'
import { characterRepository } from '../repository'

export async function getByUserId(userId: number): Promise<Character | null> {
  return await characterRepository.getByUserId(userId)
}
