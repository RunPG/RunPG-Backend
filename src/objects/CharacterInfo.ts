import { Character, Statistics } from '@prisma/client'

export default interface CharacterInfo {
  userId: number,
  character: Character,
  statistics: Statistics
}
