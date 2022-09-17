import CharacterInfo from '../objects/CharacterInfo'
import { characterRepository, statisticsRepository } from '../repository'

export async function getByUserId(userId: number): Promise<CharacterInfo | null> {
  const character = await characterRepository.getByUserId(userId)
  if (character == null) {
    return null
  }
  const statistics = await statisticsRepository.getById(character.statisticsId)
  if (statistics == null) {
    return null
  }

  return {
    userId,
    character,
    statistics
  }
}
