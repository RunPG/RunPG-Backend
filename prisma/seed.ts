import { NotificationType, PrismaClient } from '@prisma/client'
import moment from 'moment'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  const now = new Date()

  await prisma.equipementBase.createMany({
    data: [
      {
        name: 'Casque en cuir',
        description: 'Un casque que tu as trouvé sur le bord de la route, tu n\'es même pas sûr que ce soit un casque, mais il est unique à tes yeux.',
        rarity: 'RELIC',
        heroClass: 'PALADIN',
        equipementType: 'HELMET'
      },
      {
        name: 'T-shirt',
        description: 'Un t-shirt fait par ta mamounette chérie pour son poussin.',
        rarity: 'RELIC',
        heroClass: 'PALADIN',
        equipementType: 'CHESTPLATE'
      },
      {
        name: 'Gants de cuisine',
        description: 'Une pair de gant que tu as pris de chez toi dans la panique. Tu regrettes peut-être ton choix maintenant.',
        equipementType: 'GLOVES',
        heroClass: 'PALADIN',
        rarity: 'COMMON'
      },
      {
        name: 'Pantalon troué',
        description: 'Il n\'est même pas à ta taille, mais tu continues à le porter. Pourquoi ?',
        rarity: 'COMMON',
        heroClass: 'PALADIN',
        equipementType: 'LEGGINGS'
      },
      {
        name: 'Hache en pierre',
        description: 'Coupe difficilement du bois, reste relativement efficace contre les agresseurs.',
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
        heroClass: 'MAGE',
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
      },
      {
        heroClass: 'PALADIN',
        experience: 0,
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
        name: 'Gabriel',
        lastCaloriesUpdate: now,
        uid: 'zzz',
        mail: 'gabriel@lecherf.com',
        refreshToken: 'none'
      },
      {
        name: 'yott94',
        uid: 'g03636930156556937198',
        lastCaloriesUpdate: now,
        characterId: 1,
        mail: 'eliott.bru@gmail.com',
        refreshToken: 'none'
      },
      {
        name: 'LeMoutonZen',
        uid: 'g05184935568108008541',
        lastCaloriesUpdate: now,
        characterId: 2,
        mail: 'moutonzenyatta@gmail.com',
        refreshToken: 'none'
      },
      {
        name: 'KiéranF',
        uid: 'cccc',
        lastCaloriesUpdate: moment().subtract(1, 'day').toDate(),
        mail: 'kieranfooks@gmail.com',
        refreshToken: '1//03C4ZcMu8bTBeCgYIARAAGAMSNwF-L9Ir-JsifJcnfkZjee2rfLSN4k4NQEF5sb0_5vHA7huJ6O-4KGTvHBELty6V-TJY1J_sYNA',
        characterId: 3
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
