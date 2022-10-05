import { NotificationType, PrismaClient } from '@prisma/client'
import moment from 'moment'
import { equipementBases } from './equipementSeed'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  const now = new Date()

  await prisma.equipementBase.createMany({
    data: [
      ...equipementBases
    ],
    skipDuplicates: true
  })

  await prisma.item.createMany({
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

  await prisma.statistics.createMany({
    data: [
      {
        id: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 2,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 3,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 4,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 5,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 6,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 7,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 8,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 9,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 10,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 11,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 12,
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

  await prisma.equipement.createMany({
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
      }
    ],
    skipDuplicates: true
  })

  await prisma.spell.createMany({
    data: [
      {
        name: 'Basic Attack',
        cooldown: 10,
        manaCost: 20,
        description: 'Swing your weapon and maybe you will kill something.',
        heroClass: 'PALADIN'
      },
      {
        name: 'Heal',
        cooldown: 5,
        manaCost: 15,
        description: 'Do sparkles with your fingers to sparkle up someone\'s health.',
        heroClass: 'PALADIN'
      },
      {
        name: 'Smash',
        cooldown: 1,
        manaCost: 2,
        description: 'Combine the power of your two fists into one swing.',
        heroClass: 'PALADIN'
      },
      {
        name: 'Sleep',
        cooldown: 50,
        manaCost: 0,
        description: 'Close your eyes. That\'s it.',
        heroClass: 'PALADIN'
      },
      {
        name: 'Boule de feu',
        cooldown: 10,
        manaCost: 20,
        description: 'Swing your weapon and maybe you will kill something.',
        heroClass: 'MAGE'
      },
      {
        name: 'Embrasement',
        cooldown: 5,
        manaCost: 15,
        description: 'Do sparkles with your fingers to sparkle up someone\'s health.',
        heroClass: 'MAGE'
      }
    ],
    skipDuplicates: true
  })

  await prisma.character.createMany({
    data: [
      {
        heroClass: 'PALADIN',
        experience: 0,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: 3,
        fourthSpellId: 4,
        weaponId: 5,
        statisticsId: 11,
        helmetId: 1,
        chestplateId: 2,
        glovesId: 3,
        leggingsId: 4
      },
      {
        heroClass: 'MAGE',
        experience: 0,
        firstSpellId: 5,
        secondSpellId: 5,
        thirdSpellId: 6,
        fourthSpellId: 6,
        weaponId: 10,
        statisticsId: 12,
        helmetId: 6,
        chestplateId: 7,
        glovesId: 8,
        leggingsId: 9
      }
    ],
    skipDuplicates: true
  })

  await prisma.user.createMany({
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
      }
    ],
    skipDuplicates: true
  })

  await prisma.friend.createMany({
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
  await prisma.notification.createMany({
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

  await prisma.inventory.createMany({
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
      }
    ],
    skipDuplicates: true
  })
}

main()
  .then(() => {
    console.log('Migration done')
    console.log('coucou')
  })
  .catch(err => {
    console.error(err)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
