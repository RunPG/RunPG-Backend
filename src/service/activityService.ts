import { Activity } from '@prisma/client'
import moment from 'moment'
import { activityRepository, userRepository } from '../repository'

const ACTIVITY_DELAY_IN_MS = moment.duration(5, 'minutes').asMilliseconds()

export async function create(userId: number, activityId: string): Promise<Activity | null> {
  if (await userRepository.getById(userId) == null) {
    return null
  }

  return await activityRepository.create(userId, activityId)
}

export async function getUserActivity(userId: number, activityId: string): Promise<number | null> {
  if (await userRepository.getById(userId) == null) {
    return null
  }

  const activity = await activityRepository.getUserLastActivity(userId, activityId)
  if (activity == null) {
    return 0
  }

  // return moment.duration(moment().diff(activity.date)).asMilliseconds() >= ACTIVITY_DELAY_IN_MS
  return activity.date.getTime()
}
