import { User, Friend } from '@prisma/client'
import { userRepository } from '../repository'

export async function getByName(name: string): Promise<User | null> {
  return await userRepository.getByName(name)
}

export async function create(name: string): Promise<User | null> {
  if (await userRepository.getByName(name) != null) {
    return null
  }

  return await userRepository.create(name)
}
export async function getAllUsers(): Promise<User[] | null> {
  return await userRepository.getAllUsers()
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

// TODO: Add User not found exception
export async function incrementExperience(idUser: number, xp: number): Promise<void> {
  if (await userRepository.getById(idUser) != null) {
    await userRepository.incrementExperience(idUser, xp)
  }
}

export async function getUserById(id: number): Promise<User | null> {
  return await userRepository.getById(id)
}
