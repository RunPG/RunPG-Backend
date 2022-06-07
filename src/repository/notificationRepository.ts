import { Notification, NotificationType } from '@prisma/client'
import prisma from './client'

export async function getNotification(receiverId: number, senderId: number, type: NotificationType): Promise<Notification | null> {
  return await prisma.notification.findUnique({
    where: {
      senderId_receiverId_type:
      {
        senderId,
        receiverId,
        type
      }
    }
  })
}

export async function getAllNotifications(receiverId: number): Promise<Notification[] | null> {
  return await prisma.notification.findMany({
    where: {
      receiverId
    }
  })
}

export async function getAllNotificationsByType(receiverId: number, type: NotificationType): Promise<Notification[] | null> {
  return await prisma.notification.findMany({
    where: {
      receiverId,
      type
    }
  })
}

// FIXME: Default values
export async function create(receiverId: number, senderId: number, type: NotificationType): Promise<Notification | null> {
  return await prisma.notification.create({
    data: {
      senderId,
      receiverId,
      type
    }
  })
}
