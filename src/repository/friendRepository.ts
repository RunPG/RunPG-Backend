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
