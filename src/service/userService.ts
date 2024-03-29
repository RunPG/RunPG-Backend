import { User, Friend, HeroClass, Character, Statistics, Inventory } from '@prisma/client'
import { characterService, googleService, userService } from '.'
import CharacterInfo from '../objects/CharacterInfo'
import Resources from '../objects/Resources'
import { characterRepository, equipmentRepository, friendRepository, guildRepository, inventoryRepository, notificationRepository, statisticsRepository, userRepository } from '../repository'
import { getClassSeed } from './classService'

export async function getById(id: number): Promise<User | null> {
  return userRepository.getById(id)
}

export async function getByName(name: string): Promise<User | null> {
  return userRepository.getByName(name)
}

export async function getByMail(mail: string): Promise<User | null> {
  return userRepository.getByMail(mail)
}

export async function getAllUsers(): Promise<User[]> {
  return userRepository.getAllUsers()
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

  const helmet = await equipmentRepository.create(seed.helmetId, helmetStats.id)
  const chestplate = await equipmentRepository.create(seed.chestplateId, chestplateStats.id)
  const leggings = await equipmentRepository.create(seed.leggingsId, leggingsStats.id)
  const gloves = await equipmentRepository.create(seed.glovesId, glovesStats.id)
  const weapon = await equipmentRepository.create(seed.weaponId, weaponStats.id)

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
    crystal: 0,
    gold: 0
  }
  const character = await characterRepository.create(hero)

  const user = await userRepository.create(name, uid, character.id, mail, refreshToken)

  await inventoryRepository.createEquipment(user.id, helmet.id)
  await inventoryRepository.createEquipment(user.id, chestplate.id)
  await inventoryRepository.createEquipment(user.id, leggings.id)
  await inventoryRepository.createEquipment(user.id, gloves.id)
  await inventoryRepository.createEquipment(user.id, weapon.id)

  return user
}

export async function getFriend(userId: number, friendId: number): Promise<Friend | null> {
  return userRepository.getFriend(userId, friendId)
}

export async function getAllFriends(userId: number): Promise<Friend[] | null> {
  return userRepository.getAllFriends(userId)
}

export async function addFriend(userId: number, friendId: number): Promise<Friend | null> {
  if (userRepository.getById(userId) == null || userRepository.getById(friendId) == null) {
    return null
  }

  if (await userRepository.getFriend(userId, friendId) != null) {
    return null
  }

  return userRepository.addFriend(userId, friendId)
}

export async function removeFriend(userId: number, friendId: number): Promise<boolean> {
  const deleteCount = await friendRepository.deleteFriendship(userId, friendId)

  return deleteCount !== 0
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
  return userRepository.getById(id)
}

export async function joinGuild(id: number, guildId: number): Promise<User | null> {
  return userRepository.joinGuild(id, guildId)
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

  do {
    character.experience -= xpForLevel
    currentStatistics.level += 1
    xpForLevel = characterService.getXpRequired(currentStatistics.level)
  } while (character.experience >= xpForLevel && currentStatistics.level < statistics.level)

  if (currentStatistics.level != statistics.level) {
    return null
  }

  await characterRepository.levelUp(character, statistics)

  return characterService.getByUserId(userId)
}

export async function updateResources(userId: number, resources: Resources): Promise<Character | null> {
  const character = await characterRepository.getByUserId(userId)
  if (character == null) {
    return null
  }

  return characterRepository.updateResources(character.id, resources)
}

export async function getTodayCalories(userId: number): Promise<number | null> {
  const user = await userRepository.getById(userId)
  if (user == null) {
    return null
  }
  await userService.updateExperience(userId)

  return googleService.getTodayCalories(user)
}

export async function updateEquiped(userId: number, helmetId: number, chestplateId: number, glovesId: number, leggingsId: number, weaponId: number): Promise<Character | null> {
  const user = await userRepository.getById(userId)
  if (user == null) {
    return null
  }

  const userInventory = await inventoryRepository.getByUserId(userId)
  const hasEquipment = (id: number): boolean => userInventory
    .filter((value: Inventory) => value.equipmentId === id)
    .length === 1

  if (!hasEquipment(helmetId) || !hasEquipment(chestplateId) || !hasEquipment(glovesId) || !hasEquipment(leggingsId) || !hasEquipment(weaponId)) {
    return null
  }

  return characterRepository.updateEquiped(user.characterId!, helmetId, chestplateId, glovesId, leggingsId, weaponId)
}

export async function incrementExperienceManually(userId: number, xp: number): Promise<Character | null> {
  if (await userRepository.getById(userId) == null) {
    return null
  }

  await userRepository.incrementExperienceWithoutDateUpdate(userId, xp)
  return characterRepository.getByUserId(userId)
}

export async function leaveGuild(userId: number): Promise<boolean> {
  const user = await userRepository.getById(userId)
  if (user == null || user.guildId == null) {
    return false
  }

  if (user.isGuildOwner) {
    const members = await userRepository.getMembersOfGuild(user.guildId)

    if (members.length == 1) {
      await userRepository.leaveGuild(userId)
      await guildRepository.remove(user.guildId)

      return true
    } else {
      const newOwnerId = members.filter(member => member.isGuildOwner == false)[0].id
      await userRepository.setGuildOwner(newOwnerId)
    }
  }

  await userRepository.leaveGuild(userId)

  return true
}
