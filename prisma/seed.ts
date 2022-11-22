import { NotificationType, PrismaClient } from '@prisma/client'
import moment from 'moment'
import { seedEquipmentBases } from './equipmentSeed'

export const seedPrismaClient = new PrismaClient()

async function main(): Promise<void> {
  const now = new Date()

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

  await seedPrismaClient.statistics.createMany({
    data: [
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      }
    ],
    skipDuplicates: true
  })

  await seedPrismaClient.equipment.createMany({
    data: [
      {
        equipmentBaseId: 1,
        statisticsId: 1
      },
      {
        equipmentBaseId: 2,
        statisticsId: 2
      },
      {
        equipmentBaseId: 3,
        statisticsId: 3
      },
      {
        equipmentBaseId: 4,
        statisticsId: 4
      },
      {
        equipmentBaseId: 5,
        statisticsId: 5
      },
      {
        equipmentBaseId: 1,
        statisticsId: 6
      },
      {
        equipmentBaseId: 2,
        statisticsId: 7
      },
      {
        equipmentBaseId: 3,
        statisticsId: 8
      },
      {
        equipmentBaseId: 4,
        statisticsId: 9
      },
      {
        equipmentBaseId: 5,
        statisticsId: 10
      },
      {
        equipmentBaseId: 1,
        statisticsId: 11
      },
      {
        equipmentBaseId: 2,
        statisticsId: 12
      },
      {
        equipmentBaseId: 3,
        statisticsId: 13
      },
      {
        equipmentBaseId: 4,
        statisticsId: 14
      },
      {
        equipmentBaseId: 5,
        statisticsId: 15
      },
      {
        equipmentBaseId: 1,
        statisticsId: 16
      },
      {
        equipmentBaseId: 2,
        statisticsId: 17
      },
      {
        equipmentBaseId: 3,
        statisticsId: 18
      },
      {
        equipmentBaseId: 4,
        statisticsId: 19
      },
      {
        equipmentBaseId: 5,
        statisticsId: 20
      },
      {
        equipmentBaseId: 1,
        statisticsId: 21
      },
      {
        equipmentBaseId: 2,
        statisticsId: 22
      },
      {
        equipmentBaseId: 3,
        statisticsId: 23
      },
      {
        equipmentBaseId: 4,
        statisticsId: 24
      },
      {
        equipmentBaseId: 5,
        statisticsId: 25
      }
    ],
    skipDuplicates: true
  })

  await seedPrismaClient.character.createMany({
    data: [
      // Kieran
      {
        heroClass: 'PALADIN',
        experience: 0,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: 3,
        fourthSpellId: 4,
        weaponId: 5,
        statisticsId: 26,
        helmetId: 1,
        chestplateId: 2,
        glovesId: 3,
        leggingsId: 4,
        gold: 100
      },
      // editor
      {
        heroClass: 'MAGE',
        experience: 0,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: 3,
        fourthSpellId: 4,
        weaponId: 10,
        statisticsId: 27,
        helmetId: 6,
        chestplateId: 7,
        glovesId: 8,
        leggingsId: 9,
        gold: 100
      },
      // yott
      {
        heroClass: 'MAGE',
        experience: 0,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: 3,
        fourthSpellId: 4,
        weaponId: 15,
        statisticsId: 28,
        helmetId: 11,
        chestplateId: 12,
        glovesId: 13,
        leggingsId: 14,
        gold: 100
      },
      // mouton
      {
        heroClass: 'MAGE',
        experience: 0,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: 3,
        fourthSpellId: 4,
        weaponId: 20,
        statisticsId: 29,
        helmetId: 16,
        chestplateId: 17,
        glovesId: 18,
        leggingsId: 19,
        gold: 100
      },
      // firewop
      {
        heroClass: 'MAGE',
        experience: 0,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: 3,
        fourthSpellId: 4,
        weaponId: 25,
        statisticsId: 30,
        helmetId: 21,
        chestplateId: 22,
        glovesId: 23,
        leggingsId: 24,
        gold: 100
      }
    ],
    skipDuplicates: true
  })

  await seedPrismaClient.user.createMany({
    data: [
      {
        name: 'KiéranF',
        uid: 'cccc',
        lastCaloriesUpdate: moment().subtract(1, 'day').toDate(),
        mail: 'kieranfooks@gmail.com',
        refreshToken: '1//03C4ZcMu8bTBeCgYIARAAGAMSNwF-L9Ir-JsifJcnfkZjee2rfLSN4k4NQEF5sb0_5vHA7huJ6O-4KGTvHBELty6V-TJY1J_sYNA',
        characterId: 1
      },
      {
        name: 'Editor',
        uid: 'unity',
        lastCaloriesUpdate: now,
        mail: 'editor@gmail.com',
        refreshToken: null,
        characterId: 2
      },
      {
        uid: 'g03636930156556937198',
        name: 'yott94',
        mail: 'eliott.bru@gmail.com',
        refreshToken: '1//09QjzIGjdNw2UCgYIARAAGAkSNwF-L9IrFfeHmIGOFNbV0t_2AnZ-DxgBBzIwzoMME9rZgt3LZ2HEtNNUgwjNWWFPbQlKgNJPybY',
        characterId: 3,
        lastCaloriesUpdate: now
      },
      {
        uid: 'g05184935568108008541',
        name: 'LeMoutonZen',
        mail: 'moutonzenyatta@gmail.com',
        refreshToken: '1//099y_3j7zVRpkCgYIARAAGAkSNwF-L9Ir28ntBUGhmrfpvR5_0WNHThX2S_gV5lex-prHk0mSdfoDzVXMt9LJRgl1L71StKzuX_k',
        characterId: 4,
        lastCaloriesUpdate: now
      },
      {
        uid: 'g16763338310450754557',
        name: 'Firewop',
        mail: 'gabriel.lecherf@gmail.com',
        refreshToken: '1//09sDS2zwdaEGyCgYIARAAGAkSNwF-L9Ir9GPjOggQpopQhurO7FN2sQPWbUgpP3mvBS5EY-JZB6d_WdguIjMgfi_iZ2AwhNxF_bY',
        characterId: 5,
        lastCaloriesUpdate: now
      }
    ],
    skipDuplicates: true
  })

  await seedPrismaClient.friend.createMany({
    data: [
      {
        userId: 1,
        friendId: 2
      },
      {
        userId: 2,
        friendId: 1
      }
    ],
    skipDuplicates: true
  })

  await seedPrismaClient.notification.createMany({
    data: [
      {
        senderId: 2,
        receiverId: 1,
        type: NotificationType.FRIENDLIST
      },
      {
        senderId: 2,
        receiverId: 1,
        type: NotificationType.LOBBY
      }
    ],
    skipDuplicates: true
  })

  await seedPrismaClient.inventory.createMany({
    data: [
      {
        userId: 1,
        stackSize: 1,
        equipmentId: 1
      },
      {
        userId: 1,
        stackSize: 1,
        equipmentId: 2
      },
      {
        userId: 1,
        stackSize: 1,
        equipmentId: 3
      },
      {
        userId: 1,
        stackSize: 1,
        equipmentId: 4
      },
      {
        userId: 1,
        stackSize: 1,
        equipmentId: 5
      },
      {
        userId: 2,
        stackSize: 1,
        equipmentId: 6
      },
      {
        userId: 2,
        stackSize: 1,
        equipmentId: 7
      },
      {
        userId: 2,
        stackSize: 1,
        equipmentId: 8
      },
      {
        userId: 2,
        stackSize: 1,
        equipmentId: 9
      },
      {
        userId: 2,
        stackSize: 1,
        equipmentId: 10
      },
      {
        userId: 3,
        stackSize: 1,
        equipmentId: 11
      },
      {
        userId: 3,
        stackSize: 1,
        equipmentId: 12
      },
      {
        userId: 3,
        stackSize: 1,
        equipmentId: 13
      },
      {
        userId: 3,
        stackSize: 1,
        equipmentId: 14
      },
      {
        userId: 3,
        stackSize: 1,
        equipmentId: 15
      },
      {
        userId: 4,
        stackSize: 1,
        equipmentId: 16
      },
      {
        userId: 4,
        stackSize: 1,
        equipmentId: 17
      },
      {
        userId: 4,
        stackSize: 1,
        equipmentId: 18
      },
      {
        userId: 4,
        stackSize: 1,
        equipmentId: 19
      },
      {
        userId: 4,
        stackSize: 1,
        equipmentId: 20
      },
      {
        userId: 5,
        stackSize: 1,
        equipmentId: 21
      },
      {
        userId: 5,
        stackSize: 1,
        equipmentId: 22
      },
      {
        userId: 5,
        stackSize: 1,
        equipmentId: 23
      },
      {
        userId: 5,
        stackSize: 1,
        equipmentId: 24
      },
      {
        userId: 5,
        stackSize: 1,
        equipmentId: 25
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
