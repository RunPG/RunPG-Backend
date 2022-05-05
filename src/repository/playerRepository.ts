import { PrismaClient, player,friend } from '@prisma/client'


const prisma = new PrismaClient()

export async function getByName(name: string): Promise<player | null> {
  const player = await prisma.player.findUnique({
    where: {
      name: name
    }
  })

  return player
}

export async function create(name: string): Promise<player | null>{
  const player = await prisma.player.create({
    data: {
      name
    }
  })

  return player
}
//Find UNIQUE ?
export async function getFriend(id_user:number,id_friend:number): Promise<friend | null> {
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
export async function addFriend(id_user:number,id_friend:number): Promise<friend | null>{
  const friend = await prisma.friend.create({
    data: {
      id_user,
      id_friend,
    }
  })
  return friend
}