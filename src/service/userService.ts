import { User, Friend, HeroClass } from '@prisma/client'
import { characterRepository, friendRepository, inventoryRepository, notificationRepository, userRepository } from '../repository'

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

  // TODO: Get class seed

  // TODO: create stats
  // TODO: create Equipement

  // create character
  const character = await characterRepository.create(heroClass)

  // TODO: add items to inventory

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
