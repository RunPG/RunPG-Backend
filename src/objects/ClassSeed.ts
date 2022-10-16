import { Statistics } from '@prisma/client'

export default interface ClassSeed {
  statistics: Statistics,
  firstSpellId: number | null,
  secondSpellId: number | null,
  thirdSpellId: number | null,
  fourthSpellId: number | null,
  helmetId: number,
  chestplateId: number,
  leggingsId: number,
  glovesId: number,
  weaponId: number,
}
