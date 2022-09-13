import { HeroClass } from '@prisma/client'
import ClassSeed from '../objects/ClassSeed'

export function getClassSeed(heroClass: HeroClass): ClassSeed {
  switch (heroClass) {
    case HeroClass.MAGE:
      return {
        helmetId: 1,
        chestplateId: 2,
        leggingsId: 4,
        glovesId: 3,
        weaponId: 5,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: 3,
        fourthSpellId: 4,
        statistics: { // To update
          id: 0,
          level: 1,
          agility: 1,
          defense: 1,
          power: 1,
          precision: 1,
          resistance: 1,
          strength: 1,
          vitality: 1
        }
      }
    case HeroClass.PALADIN:
      return {
        helmetId: 1,
        chestplateId: 2,
        leggingsId: 4,
        glovesId: 3,
        weaponId: 5,
        firstSpellId: 5,
        secondSpellId: 6,
        thirdSpellId: 7,
        fourthSpellId: 8,
        statistics: { // To update
          id: 0,
          level: 1,
          agility: 1,
          defense: 1,
          power: 1,
          precision: 1,
          resistance: 1,
          strength: 1,
          vitality: 1
        }
      }

    default:
      throw new Error('Unsupported hero class')
  }
}
