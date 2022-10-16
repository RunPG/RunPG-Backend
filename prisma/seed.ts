import { NotificationType, PrismaClient } from '@prisma/client'
import moment from 'moment'
import { seedEquipementBases } from './equipementSeed'

export const seedPrismaClient = new PrismaClient()

async function main(): Promise<void> {
  const now = new Date()

  await seedEquipementBases()

  await seedPrismaClient.item.createMany({
    data: [
      {
        name: 'Bave de slime',
        description: 'C\'est visqueux ...',
        isConsomable: false
      },
      {
        name: 'Potion de vie',
        description: 'Redonne de la vie',
        isConsomable: true
      },
      {
        name: 'Bombe',
        description: 'Explose une fois lancée sur un ennemi',
        isConsomable: true
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

  await seedPrismaClient.equipement.createMany({
    data: [
      {
        equipementBaseId: 1,
        statisticsId: 1
      },
      {
        equipementBaseId: 2,
        statisticsId: 2
      },
      {
        equipementBaseId: 3,
        statisticsId: 3
      },
      {
        equipementBaseId: 4,
        statisticsId: 4
      },
      {
        equipementBaseId: 5,
        statisticsId: 5
      },
      {
        equipementBaseId: 1,
        statisticsId: 6
      },
      {
        equipementBaseId: 2,
        statisticsId: 7
      },
      {
        equipementBaseId: 3,
        statisticsId: 8
      },
      {
        equipementBaseId: 4,
        statisticsId: 9
      },
      {
        equipementBaseId: 5,
        statisticsId: 10
      },
      {
        equipementBaseId: 1,
        statisticsId: 11
      },
      {
        equipementBaseId: 2,
        statisticsId: 12
      },
      {
        equipementBaseId: 3,
        statisticsId: 13
      },
      {
        equipementBaseId: 4,
        statisticsId: 14
      },
      {
        equipementBaseId: 5,
        statisticsId: 15
      },
      {
        equipementBaseId: 1,
        statisticsId: 16
      },
      {
        equipementBaseId: 2,
        statisticsId: 17
      },
      {
        equipementBaseId: 3,
        statisticsId: 18
      },
      {
        equipementBaseId: 4,
        statisticsId: 19
      },
      {
        equipementBaseId: 5,
        statisticsId: 20
      },
      {
        equipementBaseId: 1,
        statisticsId: 21
      },
      {
        equipementBaseId: 2,
        statisticsId: 22
      },
      {
        equipementBaseId: 3,
        statisticsId: 23
      },
      {
        equipementBaseId: 4,
        statisticsId: 24
      },
      {
        equipementBaseId: 5,
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
        leggingsId: 4
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
        leggingsId: 9
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
        leggingsId: 14
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
        leggingsId: 19
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
        leggingsId: 24
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
        equipementId: 1
      },
      {
        userId: 1,
        stackSize: 1,
        equipementId: 2
      },
      {
        userId: 1,
        stackSize: 1,
        equipementId: 3
      },
      {
        userId: 1,
        stackSize: 1,
        equipementId: 4
      },
      {
        userId: 1,
        stackSize: 1,
        equipementId: 5
      },
      {
        userId: 2,
        stackSize: 1,
        equipementId: 6
      },
      {
        userId: 2,
        stackSize: 1,
        equipementId: 7
      },
      {
        userId: 2,
        stackSize: 1,
        equipementId: 8
      },
      {
        userId: 2,
        stackSize: 1,
        equipementId: 9
      },
      {
        userId: 2,
        stackSize: 1,
        equipementId: 10
      },
      {
        userId: 3,
        stackSize: 1,
        equipementId: 11
      },
      {
        userId: 3,
        stackSize: 1,
        equipementId: 12
      },
      {
        userId: 3,
        stackSize: 1,
        equipementId: 13
      },
      {
        userId: 3,
        stackSize: 1,
        equipementId: 14
      },
      {
        userId: 3,
        stackSize: 1,
        equipementId: 15
      },
      {
        userId: 4,
        stackSize: 1,
        equipementId: 16
      },
      {
        userId: 4,
        stackSize: 1,
        equipementId: 17
      },
      {
        userId: 4,
        stackSize: 1,
        equipementId: 18
      },
      {
        userId: 4,
        stackSize: 1,
        equipementId: 19
      },
      {
        userId: 4,
        stackSize: 1,
        equipementId: 20
      },
      {
        userId: 5,
        stackSize: 1,
        equipementId: 21
      },
      {
        userId: 5,
        stackSize: 1,
        equipementId: 22
      },
      {
        userId: 5,
        stackSize: 1,
        equipementId: 23
      },
      {
        userId: 5,
        stackSize: 1,
        equipementId: 24
      },
      {
        userId: 5,
        stackSize: 1,
        equipementId: 25
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
