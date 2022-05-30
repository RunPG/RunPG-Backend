-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FRIENDLIST', 'LOBBY', 'GUILD');

-- CreateTable
CREATE TABLE "Notification" (
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "type" "NotificationType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_senderId_receiverId_key" ON "Notification"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
