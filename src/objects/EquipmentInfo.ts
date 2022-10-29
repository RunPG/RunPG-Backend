import { EquipmentBase, Statistics } from '@prisma/client'

export default interface EquipmentInfo {
  id: number,
  equipmentBase: EquipmentBase,
  statistics: Statistics
}
