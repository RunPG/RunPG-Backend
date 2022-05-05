import { player,friend } from '@prisma/client'
import { playerRepository } from '../repository'

export async function getByName(name: string): Promise<player | null> {
  return await playerRepository.getByName(name)
}

export async function create(name: string): Promise<player | null> {
  if (await playerRepository.getByName(name) != null) {
    return null
  }

  return await playerRepository.create(name)
}

export async function getAllFriends(id_user: number): Promise<friend[] | null> {
  return await playerRepository.getAllFriends(id_user)
}

export async function addFriend(id_user: number,id_friend: number): Promise<friend | null> {
  if (await playerRepository.getFriend(id_user,id_friend) != null) {
    return null
  }

  return await playerRepository.addFriend(id_user,id_friend)
}
