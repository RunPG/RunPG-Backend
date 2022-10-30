import prisma from '../../repository/client'
import { characters, equipmentBases, equipments, guilds, statistics, users } from '../testData'

export async function seedDatabase(): Promise<void> {

  const createEquipmentBase = prisma.equipmentBase.createMany({
    data: equipmentBases
  })

  const createStatistics = prisma.statistics.createMany({
    data: statistics
  })

  const createEquipment = prisma.equipment.createMany({
    data: equipments
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
    createEquipmentBase,
    createStatistics,
    createEquipment,
    createCharacter,
    createGuild,
    createUser
  ])
}

export async function clearDatabase(): Promise<void> {
  const deleteUser = prisma.user.deleteMany()
  const deleteCharacter = prisma.character.deleteMany()
  const deleteEquipment = prisma.equipment.deleteMany()
  const deleteEquipmentBase = prisma.equipmentBase.deleteMany()
  const deleteStat = prisma.statistics.deleteMany()
  const deleteGuild = prisma.guild.deleteMany()

  await prisma.$transaction([
    deleteUser,
    deleteCharacter,
    deleteEquipment,
    deleteEquipmentBase,
    deleteStat,
    deleteGuild
  ])

  await prisma.$disconnect()
}
