import { User } from '@prisma/client'
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
