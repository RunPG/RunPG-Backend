import { User, Friend } from '@prisma/client'
import { userRepository } from '../repository'

export async function getById(id: number): Promise<User | null> {
  return await userRepository.getById(id)
}

export async function getByName(name: string): Promise<User | null> {
  return await userRepository.getByName(name)
}

export async function getAllUsers(): Promise<User[]> {
  return await userRepository.getAllUsers()
}

export async function create(name: string): Promise<User | null> {
  if (await userRepository.getByName(name) != null) {
    return null
  }

  return await userRepository.create(name)
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
