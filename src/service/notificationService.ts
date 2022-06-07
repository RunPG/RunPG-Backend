import { Notification, NotificationType } from '@prisma/client'
import { notificationRepository } from '../repository'

export async function getNotification(receiverId: number, senderId: number, type: NotificationType): Promise<Notification | null> {
  return await notificationRepository.getNotification(receiverId, senderId, type)
}

export async function create(receiverId: number, senderId: number, type: NotificationType): Promise<Notification | null> {
  if (await notificationRepository.getNotification(receiverId, senderId, type) != null) {
    return null
  }
  return await notificationRepository.create(receiverId, senderId, type)
}

export async function getAllNotifications(receiverId: number): Promise<Notification[] | null> {
  return await notificationRepository.getAllNotifications(receiverId)
}

export async function getAllNotificationsByType(receiverId: number, type: NotificationType): Promise<Notification[] | null> {
  return await notificationRepository.getAllNotificationsByType(receiverId, type)
}
