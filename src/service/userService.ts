import { User, Friend, HeroClass, Character } from '@prisma/client'
import { characterRepository, equipementRepository, friendRepository, inventoryRepository, notificationRepository, statisticsRepository, userRepository } from '../repository'
import { getClassSeed } from './classService'

export async function getById(id: number): Promise<User | null> {
  return await userRepository.getById(id)
}

export async function getByName(name: string): Promise<User | null> {
  return await userRepository.getByName(name)
}

export async function getAllUsers(): Promise<User[]> {
  return await userRepository.getAllUsers()
}

export async function create(name: string, uid: string, heroClass: HeroClass): Promise<User | null> {
  if (await userRepository.getByName(name) != null || await userRepository.getByUid(uid) != null) {
    return null
  }

  const seed = getClassSeed(heroClass)

  const helmetStats = await statisticsRepository.createOnlyOneValues()
  const chestplateStats = await statisticsRepository.createOnlyOneValues()
  const leggingsStats = await statisticsRepository.createOnlyOneValues()
  const glovesStats = await statisticsRepository.createOnlyOneValues()
  const weaponStats = await statisticsRepository.createOnlyOneValues()
  const heroStats = await statisticsRepository.create(seed.statistics)

  const helmet = await equipementRepository.create(seed.helmetId, helmetStats.id)
  const chestplate = await equipementRepository.create(seed.chestplateId, chestplateStats.id)
  const leggings = await equipementRepository.create(seed.leggingsId, leggingsStats.id)
  const gloves = await equipementRepository.create(seed.glovesId, glovesStats.id)
  const weapon = await equipementRepository.create(seed.weaponId, weaponStats.id)

  const hero: Character = {
    id: 0,
    experience: 0,
    statisticsId: heroStats.id,
    helmetId: helmet.id,
    chestplateId: chestplate.id,
    leggingsId: leggings.id,
    glovesId: gloves.id,
    weaponId: weapon.id,
    firstSpellId: seed.firstSpellId,
    secondSpellId: seed.secondSpellId,
    thirdSpellId: seed.thirdSpellId,
    fourthSpellId: seed.fourthSpellId,
    heroClass
  }
  const character = await characterRepository.create(hero)

  return await userRepository.create(name, uid, character.id)
}

export async function getFriend(userId: number, friendId: number): Promise<Friend | null> {
  return await userRepository.getFriend(userId, friendId)
}

export async function getAllFriends(userId: number): Promise<Friend[] | null> {
  return await userRepository.getAllFriends(userId)
}

export async function addFriend(userId: number, friendId: number): Promise<Friend | null> {
  if (await userRepository.getFriend(userId, friendId) != null) {
    return null
  }

  return await userRepository.addFriend(userId, friendId)
}

export async function incrementExperience(idUser: number, xp: number): Promise<boolean> {
  if (await userRepository.getById(idUser) == null) {
    return false
  }

  await userRepository.incrementExperience(idUser, xp)
  return true
}

export async function getUserById(id: number): Promise<User | null> {
  return await userRepository.getById(id)
}

export async function joinGuild(id: number, guildId: number): Promise<User | null> {
  return await userRepository.joinGuild(id, guildId)
}

export async function deleteById(id: number): Promise<boolean> {
  if (await userRepository.getById(id) == null) {
    return false
  }

  await friendRepository.deleteByUserId(id)
  await notificationRepository.deleteByUserId(id)
  await inventoryRepository.deleteByUserId(id)
  return await userRepository.deleteById(id) != null
}
