import { user, friend } from '@prisma/client'
import { userRepository } from '../repository'

export async function getByName(name: string): Promise<user | null> {
  return await userRepository.getByName(name)
}

export async function create(name: string): Promise<user | null> {
  if (await userRepository.getByName(name) != null) {
    return null
  }

  return await userRepository.create(name)
}
export async function getAllUsers(): Promise<user[] | null> {
  return await userRepository.getAllUsers()
}

export async function getAllFriends(id_user: number): Promise<friend[] | null> {
  return await userRepository.getAllFriends(id_user)
}

export async function addFriend(id_user: number, id_friend: number): Promise<friend | null> {
  if (await userRepository.getFriend(id_user, id_friend) != null) {
    return null
  }

  return await userRepository.addFriend(id_user, id_friend)
}

// TODO: Add User not found exception
export async function updateXP(idUser: number, xp: number): Promise<void> {
  if (await userRepository.getById(idUser) != null) {
    await userRepository.incrementXP(idUser, xp)
  }
}

export async function getUserById(id: number): Promise<user | null> {
  return await userRepository.getById(id)
}
