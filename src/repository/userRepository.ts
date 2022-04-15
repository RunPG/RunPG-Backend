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
