import prisma from './client'

export async function deleteByUserId(userId: number): Promise<void> {
  await prisma.friend.deleteMany({
    where: {
      OR: [
        {
          userId
        },
        {
          friendId: userId
        }
      ]
    }
  })
}

export async function deleteFriendship(userId: number, friendId: number): Promise<number> {
  const { count } = await prisma.friend.deleteMany({
    where: {
      OR: [
        {
          userId,
          friendId
        },
        {
          friendId: userId,
          userId: friendId
        }
      ]
    }
  })

  return count
}
