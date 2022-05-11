import { PrismaClient, user, friend } from '@prisma/client'


const prisma = new PrismaClient()
export async function getAllUsers(): Promise<user[] | null> {
  const users = await prisma.user.findMany()
  return users
}

export async function getByName(name: string): Promise<user | null> {
  const user = await prisma.user.findUnique({
    where: {
      name: name
    }
  })

  return user
}

export async function getById(id: number): Promise<user | null> {
  return await prisma.user.findUnique({
    where: {
      id
    }
  })
}

export async function create(name: string): Promise<user | null> {
  const user = await prisma.user.create({
    data: {
      name
    }
  })

  return user
}
//Find UNIQUE ?
export async function getFriend(id_user: number, id_friend: number): Promise<friend | null> {
  const friend = await prisma.friend.findFirst({
    where: {
      id_user,
      id_friend
    }
  })
  return friend
}
export async function getAllFriends(id_user: number): Promise<friend[] | null> {
  const friends = await prisma.friend.findMany({
    where: {
      id_user
    }
  })
  return friends
}
export async function addFriend(id_user: number, id_friend: number): Promise<friend | null> {
  const friend = await prisma.friend.create({
    data: {
      id_user,
      id_friend
    }
  })
  return friend
}

export async function incrementXP(id: number, xp: number): Promise<void> {
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
      last_calories_update: new Date() // FIXME: Check date is utc
    }
  })
}
