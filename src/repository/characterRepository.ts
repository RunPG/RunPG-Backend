import { Character } from '@prisma/client'
import prisma from './client'

// TODO: Remove hardcoded values
export async function create(character: Character): Promise<Character> {
  return await prisma.character.create({
    data: {
      experience: character.experience,
      statisticsId: character.statisticsId,
      helmetId: character.helmetId,
      chestplateId: character.chestplateId,
      leggingsId: character.leggingsId,
      glovesId: character.glovesId,
      weaponId: character.weaponId,
      firstSpellId: character.firstSpellId,
      secondSpellId: character.secondSpellId,
      thirdSpellId: character.thirdSpellId,
      fourthSpellId: character.fourthSpellId,
      heroClass: character.heroClass
    }
  })
}

export async function getByUserId(userId: number): Promise<Character | null> {
  return await prisma.character.findFirst({
    where: {
      user: {
        id: userId
      }
    }
  })
}
