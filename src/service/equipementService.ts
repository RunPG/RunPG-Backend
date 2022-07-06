import EquipementInfo from '../objects/EquipementInfo'
import { equipementBaseRepository, equipementRepository, statisticsRepository } from '../repository'

export async function getById(id: number): Promise<EquipementInfo | null> {
  const equipement = await equipementRepository.getById(id)
  if (equipement == null) {
    return null
  }

  const equipementBase = await equipementBaseRepository.getById(equipement.equipementBaseId)
  const statistics = await statisticsRepository.getById(equipement.statisticsId)
  if (equipementBase == null || statistics == null) {
    return null
  }

  return {
    id: equipement.id,
    equipementBase,
    statistics
  }
}
