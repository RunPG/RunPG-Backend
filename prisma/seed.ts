import { NotificationType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await prisma.equipementBase.createMany({
    data: [
      {
        id: 1,
        name: 'Helmet',
        description: 'A helmet you found on the side of the road, you are not even sure this is a helmet. It\' unique in its own way !',
        rarity: 'RELIC',
        heroClass: 'BERSERKER',
        equipementType: 'HELMET'
      },
      {
        id: 2,
        name: 'Shirt',
        description: 'A shirt that your mom made you.',
        rarity: 'RELIC',
        heroClass: 'BERSERKER',
        equipementType: 'CHESTPLATE'
      },
      {
        id: 3,
        name: 'Cooking gloves',
        description: 'Gloves you took from your house in a hurry.',
        equipementType: 'GLOVES',
        heroClass: 'BERSERKER',
        rarity: 'COMMON'
      },
      {
        id: 4,
        name: 'Leggings',
        description: 'They are not your size, but you still carry them. Why ?',
        rarity: 'COMMON',
        heroClass: 'BERSERKER',
        equipementType: 'LEGGINGS'
      },
      {
        id: 5,
        name: 'Wood axe',
        description: 'Used to cut wood, seems efficient to also cut enemies',
        equipementType: 'WEAPON',
        heroClass: 'BERSERKER',
        rarity: 'COMMON'
      }
    ],
    skipDuplicates: true
  })

  await prisma.statistics.createMany({
    data: [
      {
        id: 1,
        agility: 1,
        defense: 1,
        endurance: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 2,
        agility: 1,
        defense: 1,
        endurance: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 3,
        agility: 1,
        defense: 1,
        endurance: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 4,
        agility: 1,
        defense: 1,
        endurance: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 5,
        agility: 1,
        defense: 1,
        endurance: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        id: 6,
        agility: 1,
        defense: 1,
        endurance: 1,
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
        id: 1,
        equipementBaseId: 1,
        statisticsId: 1
      },
      {
        id: 2,
        equipementBaseId: 2,
        statisticsId: 2
      },
      {
        id: 3,
        equipementBaseId: 3,
        statisticsId: 3
      },
      {
        id: 4,
        equipementBaseId: 4,
        statisticsId: 4
      },
      {
        id: 5,
        equipementBaseId: 5,
        statisticsId: 5
      }
    ],
    skipDuplicates: true
  })

  await prisma.spell.createMany({
    data: [
      {
        id: 1,
        name: 'Basic Attack',
        cooldown: 10,
        manaCost: 20,
        description: 'Swing your weapon and maybe you will kill something.',
        class: 'BERSERKER'
      },
      {
        id: 2,
        name: 'Heal',
        cooldown: 5,
        manaCost: 15,
        description: 'Do sparkles with your fingers to sparkle up someone\'s health',
        class: 'BERSERKER'
      },
      {
        id: 3,
        name: 'Smash',
        cooldown: 1,
        manaCost: 2,
        description: 'Combine the power of your two fists into one swing.',
        class: 'BERSERKER'
      },
      {
        id: 4,
        name: 'Sleep',
        cooldown: 50,
        manaCost: 0,
        description: 'Close your eyes. That\' it.',
        class: 'BERSERKER'
      }
    ],
    skipDuplicates: true
  })

  await prisma.character.createMany({
    data: [
      {
        id: 1,
        class: 'BERSERKER',
        experience: 1337,
        firstSpellId: 1,
        secondSpellId: 2,
        thirdSpellId: 3,
        fourthSpellId: 4,
        weaponId: 5,
        statisticsId: 6,
        helmetId: 1,
        chestplateId: 2,
        glovesId: 3,
        leggingsId: 4
      }
    ],
    skipDuplicates: true
  })

  await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'Gabriel',
        characterId: 1,
        lastCaloriesUpdate: new Date()
      },
      {
        id: 2,
        name: 'Eliott'
      },
      {
        id: 3,
        name: 'Hugo'
      },
      {
        id: 4,
        name: 'Kieran'
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
        userId: 1,
        friendId: 3
      }
      ,
      {
        userId: 2,
        friendId: 1
      },
      {
        userId: 2,
        friendId: 3
      },
      {
        userId: 3,
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
      ,
      {
        senderId: 3,
        receiverId: 1,
        type: NotificationType.FRIENDLIST
      },
      {
        senderId: 2,
        receiverId: 3,
        type: NotificationType.FRIENDLIST
      },
      {
        senderId: 3,
        receiverId: 4,
        type: NotificationType.GUILD
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
