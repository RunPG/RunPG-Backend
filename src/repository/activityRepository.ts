import { Activity, PrismaPromise } from '@prisma/client'
import prisma from './client'

export function create(userId: number, activityId: string): PrismaPromise<Activity> {
  return prisma.activity.create({
    data: {
      userId,
      activityId
    }
  })
}

export function getUserLastActivity(userId: number, activityId: string): PrismaPromise<Activity | null> {
  return prisma.activity.findFirst({
    where: {
      userId,
      activityId
    },
    orderBy: {
      date: 'desc'
    }
  })
}
