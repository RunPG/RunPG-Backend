import { HeroClass } from '@prisma/client'
import ClassSeed from '../objects/ClassSeed'

export function getClassSeed(heroClass: HeroClass): ClassSeed {
  switch (heroClass) {
    case HeroClass.MAGE:
      return {
        helmetId: 1,
        chestplateId: 2,
        glovesId: 3,
        leggingsId: 4,
        weaponId: 6,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: null,
        fourthSpellId: null,
        statistics: {
          id: 0,
          level: 1,
          vitality: 5,
          strength: 5,
          defense: 5,
          power: 17,
          resistance: 10,
          precision: 12
        }
      }
    case HeroClass.PALADIN:
      return {
        helmetId: 1,
        chestplateId: 2,
        glovesId: 3,
        leggingsId: 4,
        weaponId: 5,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: null,
        fourthSpellId: null,
        statistics: {
          id: 0,
          level: 1,
          vitality: 11,
          strength: 8,
          defense: 11,
          power: 8,
          resistance: 11,
          precision: 5
        }
      }
    default:
      throw new Error('Unsupported hero class')
  }
}
