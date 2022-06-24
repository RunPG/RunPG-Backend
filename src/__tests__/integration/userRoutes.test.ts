import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../app'
import prisma from '../../repository/client'
import { user1, user2, user3 } from '../data'

const request = supertest(app)

/**
 * User endpoints test
 *
 * @group integration/user
 */

async function InsertData(): Promise<void> {
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  })

  await prisma.user.createMany({
    data: [
      user1,
      user2,
      user3
    ]
  })
}

afterEach(async () => {
  const deleteUser = prisma.user.deleteMany()
  const deleteCharacter = prisma.character.deleteMany()
  const deleteSpell = prisma.spell.deleteMany()
  const deleteEquipement = prisma.equipement.deleteMany()
  const deleteEquipementBase = prisma.equipementBase.deleteMany()
  const deleteStat = prisma.statistics.deleteMany()

  await prisma.$transaction([
    deleteUser,
    deleteCharacter,
    deleteEquipement,
    deleteEquipementBase,
    deleteSpell,
    deleteStat
  ])

  await prisma.$disconnect()
})

test('GET a user by name should return the user returned by userService and code 200', async () => {
  await InsertData()

  const result = await request.get(`/user/name/${user1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.id).toEqual(user1.id)
  expect(result.body.name).toEqual(user1.name)
  expect(result.body.characterId).toEqual(user1.characterId)
  expect(result.body.guildId).toEqual(user1.guildId)
  expect(result.body.lastCaloriesUpdate).toEqual(user1.lastCaloriesUpdate.toISOString())
})

test('GET a user by name should return null and code 404 when userService returns null', async () => {
  await InsertData()

  const result = await request.get('/user/name/youhou')

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('GET a user by id should return the user returned by userService and code 200', async () => {
  await InsertData()

  const result = await request.get(`/user/${user1.id}`)

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.id).toEqual(user1.id)
  expect(result.body.name).toEqual(user1.name)
  expect(result.body.characterId).toEqual(user1.characterId)
  expect(result.body.guildId).toEqual(user1.guildId)
  expect(result.body.lastCaloriesUpdate).toEqual(user1.lastCaloriesUpdate.toISOString())
})

test('GET a user by id should return null and code 404 when userService returns null', async () => {
  await InsertData()

  const result = await request.get('/user/42')

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})

test('GET a user by id with wrong param should return null and code 400', async () => {
  const result = await request.get(`/user/${user1.name}`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Create a user should return the new user and code 201', async () => {
  const result = await request.post('/user')
    .send({ name: user1.name })

  expect(result.statusCode).toEqual(StatusCodes.CREATED)
  expect(result.type).toEqual(expect.stringContaining('json'))
  expect(result.body.name).toEqual(user1.name)
  expect(result.body.characterId).toEqual(user1.characterId)
  expect(result.body.guildId).toEqual(user1.guildId)
})

test('Create an already existing user should return nothing and code 409', async () => {
  await InsertData()

  const result = await request.post('/user')
    .send({ name: user1.name })

  expect(result.statusCode).toEqual(StatusCodes.CONFLICT)
  expect(result.body).toEqual({})
})

test('Create a user should return nothing and code 400 when their is no name given', async () => {
  const result = await request.post('/user')

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

// TODO: Check update
test('Update user xp should return nothing and code 200 on success', async () => {
  await InsertData()

  const result = await request.put(`/user/${user3.id}/xp`)
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.OK)
  expect(result.body).toEqual({})

  const xp = await prisma.character.findUnique({
    where: {
      id: 1
    }
  })

  expect(xp?.experience).toEqual(1337 + 50)
})

test('Update user xp should return nothing and code 400 on parse userId error', async () => {
  const result = await request.put(`/user/${user3.name}/xp`)
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 400 on parse xp error', async () => {
  const result = await request.put(`/user/${user3.id}/xp`)
    .send({ xp: 'test' })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})


test('Update user xp should return nothing and code 400 on missing body', async () => {
  const result = await request.put(`/user/${user3.id}/xp`)

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 400 when xp < 0', async () => {
  const result = await request.put(`/user/${user3.id}/xp`)
    .send({ xp: -1 })

  expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(result.body).toEqual({})
})

test('Update user xp should return nothing and code 404 when user does not exists', async () => {
  await InsertData()

  const result = await request.put('/user/42/xp')
    .send({ xp: 50 })

  expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  expect(result.body).toEqual({})
})
