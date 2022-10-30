import EquipmentInfo from '../objects/EquipmentInfo'
import { equipmentBaseRepository, equipmentRepository, statisticsRepository } from '../repository'

export async function getById(id: number): Promise<EquipmentInfo | null> {
  const equipment = await equipmentRepository.getById(id)
  if (equipment == null) {
    return null
  }

  const equipmentBase = await equipmentBaseRepository.getById(equipment.equipmentBaseId)
  const statistics = await statisticsRepository.getById(equipment.statisticsId)
  if (equipmentBase == null || statistics == null) {
    return null
  }

  return {
    id: equipment.id,
    equipmentBase,
    statistics
  }
}
