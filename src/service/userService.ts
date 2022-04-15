import { User } from '@prisma/client'
import { userRepository } from '../repository'

export async function getByName(name: string): Promise<User | null> {
  return await userRepository.getByName(name)
}
