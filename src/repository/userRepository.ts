import { PrismaClient, User, Friend } from '@prisma/client'


const prisma = new PrismaClient()
export async function getAllUsers(): Promise<User[] | null> {
  return await prisma.user.findMany()
}

export async function getByName(name: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      name
    }
  })
}

export async function getById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id
    }
  })
}

export async function create(name: string): Promise<User | null> {
  return await prisma.user.create({
    data: {
      name
    }
  })
}

//Find UNIQUE ?
export async function getFriend(userId: number, friendId: number): Promise<Friend | null> {
  return await prisma.friend.findFirst({
    where: {
      userId,
      friendId
    }
  })
}

export async function getAllFriends(userId: number): Promise<Friend[] | null> {
  return await prisma.friend.findMany({
    where: {
      userId
    }
  })
}

export async function addFriend(userId: number, friendId: number): Promise<Friend | null> {
  return await prisma.friend.create({
    data: {
      userId,
      friendId
    }
  })
}

export async function incrementExperience(id: number, xp: number): Promise<void> {
  await prisma.user.update({
    where: {
      id
    },
    data: {
      character: {
        update: {
          experience: {
            increment: xp
          }
        }
      },
      lastCaloriesUpdate: new Date() // FIXME: Check date is utc
    }
  })
}
