import { User, Friend } from '@prisma/client'
import prisma from './client'
import { AlreadyInAGuildError } from '../exception/AlreadyInAGuildError'
export async function getAllUsers(): Promise<User[]> {
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

export async function getByMail(mail: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      mail
    }
  })
}

export async function create(name: string, uid: string, characterId: number, mail: string, refreshToken: string | null): Promise<User> {
  return await prisma.user.create({
    data: {
      name,
      uid,
      characterId,
      mail,
      refreshToken
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
      lastCaloriesUpdate: new Date()
    }
  })
}

export async function joinGuild(id: number, guildId: number, isGuildOwner = false): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  if (user == null) {
    return null
  }
  if (user.guildId != null) {
    throw new AlreadyInAGuildError()
  }
  return await prisma.user.update({
    where: {
      id
    },
    data: {
      guildId,
      isGuildOwner
    }
  })
}

export async function getByUid(uid: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      uid
    }
  })
}

export async function deleteById(id: number): Promise<User | null> {
  return await prisma.user.delete({
    where: {
      id
    }
  })
}

export async function incrementExperienceWithoutDateUpdate(id: number, xp: number): Promise<void> {
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
      }
    }
  })
}
