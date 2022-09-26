import { Activity } from '@prisma/client'
import prisma from './client'

export async function create(userId: number, activityId: string): Promise<Activity> {
  return await prisma.activity.create({
    data: {
      userId,
      activityId
    }
  })
}

export async function getUserLastActivity(userId: number, activityId: string): Promise<Activity | null> {
  return await prisma.activity.findFirst({
    where: {
      userId,
      activityId
    },
    orderBy: {
      date: 'desc'
    }
  })
}
