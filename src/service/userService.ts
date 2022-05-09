import { user,friend } from '@prisma/client'
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

export async function getAllFriends(id_user: number): Promise<friend[] | null> {
  return await userRepository.getAllFriends(id_user)
}

export async function addFriend(id_user: number,id_friend: number): Promise<friend | null> {
  if (await userRepository.getFriend(id_user,id_friend) != null) {
    return null
  }

  return await userRepository.addFriend(id_user,id_friend)
}
