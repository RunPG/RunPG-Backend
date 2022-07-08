import { EquipementBase, Statistics } from '@prisma/client'

export default interface EquipementInfo {
  id: number,
  equipementBase: EquipementBase,
  statistics: Statistics
}
