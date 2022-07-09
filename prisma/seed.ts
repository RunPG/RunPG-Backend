import { NotificationType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await prisma.equipementBase.createMany({
    data: [
      {
        name: 'Helmet',
        description: 'A helmet you found on the side of the road, you are not even sure this is a helmet. It\'s unique in its own way !',
        rarity: 'RELIC',
        heroClass: 'PALADIN',
        equipementType: 'HELMET'
      },
      {
        name: 'Shirt',
        description: 'A shirt that your mom made you.',
        rarity: 'RELIC',
        heroClass: 'PALADIN',
        equipementType: 'CHESTPLATE'
      },
      {
        name: 'Cooking gloves',
        description: 'Gloves you took from your house in a hurry.',
        equipementType: 'GLOVES',
        heroClass: 'PALADIN',
        rarity: 'COMMON'
      },
      {
        name: 'Leggings',
        description: 'They are not your size, but you still carry them. Why ?',
        rarity: 'COMMON',
        heroClass: 'PALADIN',
        equipementType: 'LEGGINGS'
      },
      {
        name: 'Wood axe',
        description: 'Used to cut wood, seems efficient to also cut enemies',
        equipementType: 'WEAPON',
        heroClass: 'PALADIN',
        rarity: 'COMMON'
      }
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
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
        defense: 1,
        level: 1,
        power: 1,
        precision: 1,
        resistance: 1,
        strength: 1,
        vitality: 1
      },
      {
        agility: 1,
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
        statisticsId: 7
      },
      {
        equipementBaseId: 2,
        statisticsId: 8
      },
      {
        equipementBaseId: 3,
        statisticsId: 9
      },
      {
        equipementBaseId: 4,
        statisticsId: 10
      },
      {
        equipementBaseId: 5,
        statisticsId: 11
      },
      {
        equipementBaseId: 1,
        statisticsId: 13
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
        class: 'PALADIN'
      },
      {
        name: 'Heal',
        cooldown: 5,
        manaCost: 15,
        description: 'Do sparkles with your fingers to sparkle up someone\'s health.',
        class: 'PALADIN'
      },
      {
        name: 'Smash',
        cooldown: 1,
        manaCost: 2,
        description: 'Combine the power of your two fists into one swing.',
        class: 'PALADIN'
      },
      {
        name: 'Sleep',
        cooldown: 50,
        manaCost: 0,
        description: 'Close your eyes. That\'s it.',
        class: 'PALADIN'
      },
      {
        name: 'Boule de feu',
        cooldown: 10,
        manaCost: 20,
        description: 'Swing your weapon and maybe you will kill something.',
        class: 'MAGE'
      },
      {
        name: 'Embrasement',
        cooldown: 5,
        manaCost: 15,
        description: 'Do sparkles with your fingers to sparkle up someone\'s health.',
        class: 'MAGE'
      }
    ],
    skipDuplicates: true
  })

  await prisma.character.createMany({
    data: [
      {
        class: 'PALADIN',
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
      },
      {
        class: 'MAGE',
        experience: 1337,
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
        name: 'Gabriel',
        lastCaloriesUpdate: new Date(),
        uid: 'zzz'
      },
      {
        name: 'yott94',
        uid: 'g03636930156556937198',
        lastCaloriesUpdate: new Date(),
        characterId: 1
      },
      {
        name: 'LeMoutonZen',
        uid: 'g05184935568108008541',
        lastCaloriesUpdate: new Date(),
        characterId: 2
      },
      {
        name: 'Kieran',
        uid: 'cccc',
        lastCaloriesUpdate: new Date()
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
      },
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

  await prisma.inventory.createMany({
    data: [
      {
        userId: 3,
        stackSize: 1,
        equipementId: 11
      },
      {
        userId: 3,
        stackSize: 5,
        itemId: 2
      },
      {
        userId: 3,
        stackSize: 3,
        itemId: 3
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
    await prisma.$disconnect()
  })
