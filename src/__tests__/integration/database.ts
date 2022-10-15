import prisma from '../../repository/client'
import { characters, equipementBases, equipements, guilds, statistics, users } from '../testData'

export async function seedDatabase(): Promise<void> {

  const createEquipementBase = prisma.equipementBase.createMany({
    data: equipementBases
  })

  const createStatistics = prisma.statistics.createMany({
    data: statistics
  })

  const createEquipement = prisma.equipement.createMany({
    data: equipements
  })

  const createCharacter = prisma.character.createMany({
    data: characters
  })

  const createGuild = prisma.guild.createMany({
    data: guilds
  })

  const createUser = prisma.user.createMany({
    data: users
  })

  await prisma.$transaction([
    createEquipementBase,
    createStatistics,
    createEquipement,
    createCharacter,
    createGuild,
    createUser
  ])
}

export async function clearDatabase(): Promise<void> {
  const deleteUser = prisma.user.deleteMany()
  const deleteCharacter = prisma.character.deleteMany()
  const deleteEquipement = prisma.equipement.deleteMany()
  const deleteEquipementBase = prisma.equipementBase.deleteMany()
  const deleteStat = prisma.statistics.deleteMany()
  const deleteGuild = prisma.guild.deleteMany()

  await prisma.$transaction([
    deleteUser,
    deleteCharacter,
    deleteEquipement,
    deleteEquipementBase,
    deleteStat,
    deleteGuild
  ])

  await prisma.$disconnect()
}
