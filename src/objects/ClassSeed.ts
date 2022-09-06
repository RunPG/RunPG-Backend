import { Statistics } from '@prisma/client'

export default interface ClassSeed {
  statistics: Statistics,
  firstSpellId: number,
  secondSpellId: number,
  thirdSpellId: number,
  fourthSpellId: number,
  helmetId: number,
  chestplateId: number,
  leggingsId: number,
  glovesId: number,
  weaponId: number,
}
