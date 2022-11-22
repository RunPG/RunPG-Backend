import { Activity } from '@prisma/client'
import { activityRepository, userRepository } from '../repository'

export async function create(userId: number, activityId: string): Promise<Activity | null> {
  if (await userRepository.getById(userId) == null) {
    return null
  }

  return activityRepository.create(userId, activityId)
}

export async function isUserAuthorized(userId: number, activityId: string): Promise<number | null> {
  if (await userRepository.getById(userId) == null) {
    return null
  }

  const activity = await activityRepository.getUserLastActivity(userId, activityId)
  if (activity == null) {
    return 0
  }

  return activity.date.getTime()
}
