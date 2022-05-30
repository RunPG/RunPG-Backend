/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId,type]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Notification_senderId_receiverId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Notification_senderId_receiverId_type_key" ON "Notification"("senderId", "receiverId", "type");
