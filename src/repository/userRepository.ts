import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function getByName(name: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      name: name
    }
  })

  return user
}

export async function create(name: string): Promise<User | null>{
  const user = await prisma.user.create({
    data: {
      name
    }
  })

  return user
}
