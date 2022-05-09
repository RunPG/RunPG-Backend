/*
  Warnings:

  - You are about to drop the column `id_player` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_user,id_item_type]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friend" DROP CONSTRAINT "friend_id_friend_fkey";

-- DropForeignKey
ALTER TABLE "friend" DROP CONSTRAINT "friend_id_user_fkey";

-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_id_player_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_character_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_guild_fkey";

-- DropIndex
DROP INDEX "inventory_id_player_id_item_type_key";

-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "id_player",
ADD COLUMN     "id_user" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "player";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "id_guild" INTEGER,
    "id_character" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_character_key" ON "user"("id_character");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_id_user_id_item_type_key" ON "inventory"("id_user", "id_item_type");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_id_friend_fkey" FOREIGN KEY ("id_friend") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_character_fkey" FOREIGN KEY ("id_character") REFERENCES "character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_guild_fkey" FOREIGN KEY ("id_guild") REFERENCES "guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
