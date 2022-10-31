import { Notification, NotificationType, PrismaPromise } from '@prisma/client'
import prisma from './client'

export function getNotification(receiverId: number, senderId: number, type: NotificationType): PrismaPromise<Notification | null> {
  return prisma.notification.findUnique({
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

export function getAllNotifications(receiverId: number): PrismaPromise<Notification[] | null> {
  return prisma.notification.findMany({
    where: {
      receiverId
    }
  })
}

export function getAllNotificationsByType(receiverId: number, type: NotificationType): PrismaPromise<Notification[] | null> {
  return prisma.notification.findMany({
    where: {
      receiverId,
      type
    }
  })
}

export function create(receiverId: number, senderId: number, type: NotificationType): PrismaPromise<Notification | null> {
  return prisma.notification.create({
    data: {
      senderId,
      receiverId,
      type
    }
  })
}

export function deleteNotification(receiverId: number, senderId: number, type: NotificationType): PrismaPromise<Notification | null> {
  return prisma.notification.delete({
    where: {
      senderId_receiverId_type:{
        senderId,
        receiverId,
        type
      }
    }
  })
}

export async function deleteByUserId(userId: number): Promise<void> {
  await prisma.notification.deleteMany({
    where: {
      OR: [
        {
          receiverId: userId
        },
        {
          senderId: userId
        }
      ]
    }
  })
}
