import { Character, HeroClass } from '@prisma/client'
import prisma from './client'

// TODO: Remove hardcoded values
export async function create(heroClass: HeroClass): Promise<Character> {
  return await prisma.character.create({
    data: {
      class: heroClass,
      statisticsId: 1,
      firstSpellId: 1,
      secondSpellId: 2,
      thirdSpellId: 3,
      fourthSpellId: 4,
      helmetId: 1,
      chestplateId: 2,
      glovesId: 3,
      leggingsId: 4,
      weaponId: 5
    }
  })
}
