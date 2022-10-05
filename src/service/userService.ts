import { User, Friend, HeroClass, Character, Statistics, Inventory } from '@prisma/client'
import { characterService, googleService, userService } from '.'
import CharacterInfo from '../objects/CharacterInfo'
import Resources from '../objects/Resources'
import { characterRepository, equipementRepository, friendRepository, inventoryRepository, notificationRepository, statisticsRepository, userRepository } from '../repository'
import { getClassSeed } from './classService'

export async function getById(id: number): Promise<User | null> {
  return await userRepository.getById(id)
}

export async function getByName(name: string): Promise<User | null> {
  return await userRepository.getByName(name)
}

export async function getByMail(mail: string): Promise<User | null> {
  return await userRepository.getByMail(mail)
}

export async function getAllUsers(): Promise<User[]> {
  return await userRepository.getAllUsers()
}

export async function create(name: string, uid: string, mail: string, serverSideAccessCode: string, heroClass: HeroClass): Promise<User | null> {
  if (await userRepository.getByName(name) != null || await userRepository.getByUid(uid) != null) {
    return null
  }

  let refreshToken: string | null = null
  if (serverSideAccessCode !== 'unity-editor') {
    refreshToken = await googleService.authenticateUser(serverSideAccessCode)
    if (refreshToken == null) {
      throw new Error(`No refresh code given when authenticating user ${name} with id ${uid}`)
    }
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
    heroClass,
    cord: 0,
    crystal: 0,
    daarunEye: 0,
    gold: 0,
    rock: 0,
    wood: 0
  }
  const character = await characterRepository.create(hero)

  return await userRepository.create(name, uid, character.id, mail, refreshToken)
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

export async function updateExperience(idUser: number): Promise<boolean> {
  const user = await userRepository.getById(idUser)
  if (user == null) {
    return false
  }

  const xpGained = await googleService.getCalories(user)

  await userRepository.incrementExperience(idUser, xpGained)
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

export async function levelUpUser(userId: number, statistics: Statistics): Promise<CharacterInfo | null> {
  const character = await characterRepository.getByUserId(userId)
  if (character == null || character.statisticsId !== statistics.id) {
    return null
  }

  const currentStatistics = await statisticsRepository.getById(statistics.id)
  if (currentStatistics == null) {
    throw new Error(`Stats for user ${userId} not found`)
  }

  let xpForLevel = characterService.getXpRequired(currentStatistics.level)
  if (character.experience < xpForLevel) {
    return null
  }

  let levelIncrement = 0
  do {
    character.experience -= xpForLevel
    levelIncrement++
    xpForLevel = characterService.getXpRequired(currentStatistics.level + levelIncrement)
  } while (character.experience >= xpForLevel && currentStatistics.level + levelIncrement < statistics.level)

  if (currentStatistics.level != statistics.level) {
    return null
  }

  await characterRepository.levelUp(character, statistics)

  return await characterService.getByUserId(userId)
}

export async function updateResources(userId: number, resources: Resources): Promise<Character | null> {
  const character = await characterRepository.getByUserId(userId)
  if (character == null) {
    return null
  }

  return await characterRepository.updateResources(character.id, resources)
}

export async function getTodayCalories(userId: number): Promise<number | null> {
  const user = await userRepository.getById(userId)
  if (user == null) {
    return null
  }
  await userService.updateExperience(userId)

  return await googleService.getTodayCalories(user)
}

export async function updateEquiped(userId: number, helmetId: number, chestplateId: number, glovesId: number, leggingsId: number, weaponId: number): Promise<Character | null> {
  const user = await userRepository.getById(userId)
  if (user == null) {
    return null
  }

  const userInventory = await inventoryRepository.getByUserId(userId)
  const hasEquipement = (id: number): boolean => userInventory
    .filter((value: Inventory) => value.id === id)
    .length === 1

  if (!hasEquipement(helmetId) || !hasEquipement(chestplateId) || !hasEquipement(glovesId) || !hasEquipement(leggingsId) || !hasEquipement(weaponId)) {
    return null
  }

  return await characterRepository.updateEquiped(user.characterId!, helmetId, chestplateId, glovesId, leggingsId, weaponId)
}
