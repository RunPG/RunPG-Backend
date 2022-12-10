import { PrismaClient } from '@prisma/client'
import { seedEquipmentBases } from './equipmentSeed'

export const seedPrismaClient = new PrismaClient()

async function main(): Promise<void> {
  await seedEquipmentBases()

  await seedPrismaClient.item.createMany({
    data: [
      {
        name: 'Potion de vie',
        description: 'Redonne de la vie',
        isConsomable: true
      },
      {
        name: 'Bombe',
        description: 'Explose une fois lancée sur un ennemi',
        isConsomable: true
      },
      {
        name: 'Bois brut',
        description: 'Petit morceau de bois, utile pour se faire une cabane ou une arme.',
        isConsomable: false
      },
      {
        name: 'Fleur brut',
        description: 'C\'est tout joli, tout mignon, parfait pour nettoyer la vermine.',
        isConsomable: false
      },
      {
        name: 'Pierre brut',
        description: 'Répond présent quand on a besoin de lui.',
        isConsomable: false
      },
      {
        name: 'Bois raffiné',
        description: 'Petit morceau de bois, utile pour se faire une cabane ou une arme.',
        isConsomable: false
      },
      {
        name: 'Fleur raffinée',
        description: 'C\'est tout joli, tout mignon, parfait pour nettoyer la vermine.',
        isConsomable: false
      },
      {
        name: 'Pierre raffinée',
        description: 'Répond présent quand on a besoin de lui.',
        isConsomable: false
      },
      {
        name: 'Bois exceptionnel',
        description: 'Petit morceau de bois, utile pour se faire une cabane ou une arme.',
        isConsomable: false
      },
      {
        name: 'Fleur exceptionnelle',
        description: 'C\'est tout joli, tout mignon, parfait pour nettoyer la vermine.',
        isConsomable: false
      },
      {
        name: 'Pierre exceptionnelle',
        description: 'Répond présent quand on a besoin de lui.',
        isConsomable: false
      },
      {
        name: 'Oeil de Daarun',
        description: 'L\'avoir dans sa poche peut confèrer des pouvoirs surréels.',
        isConsomable: false
      },
      {
        name: 'Bave de slime',
        description: 'C\'est visqueux ...',
        isConsomable: false
      }
    ],
    skipDuplicates: true
  })
}

main()
  .then(() => {
    console.log('Migration done')
  })
  .catch(err => {
    console.error(err)
  })
  .finally(async () => {
    await seedPrismaClient.$disconnect()
  })
