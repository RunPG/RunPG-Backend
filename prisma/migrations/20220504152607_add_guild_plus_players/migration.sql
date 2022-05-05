/*
  Warnings:

  - You are about to drop the column `agility` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `endurance` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_chestplate` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_class` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_first_spell` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_fourth_spell` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_gloves` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_helmet` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_leggings` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_second_spell` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_third_spell` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `id_weapon` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `power` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `precision` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `resistance` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `strength` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `vitality` on the `player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_player]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_character]` on the table `player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_id_player_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_chestplate_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_class_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_first_spell_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_fourth_spell_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_gloves_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_helmet_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_leggings_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_second_spell_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_third_spell_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_weapon_fkey";

-- AlterTable
ALTER TABLE "player" DROP COLUMN "agility",
DROP COLUMN "defense",
DROP COLUMN "endurance",
DROP COLUMN "id_chestplate",
DROP COLUMN "id_class",
DROP COLUMN "id_first_spell",
DROP COLUMN "id_fourth_spell",
DROP COLUMN "id_gloves",
DROP COLUMN "id_helmet",
DROP COLUMN "id_leggings",
DROP COLUMN "id_second_spell",
DROP COLUMN "id_third_spell",
DROP COLUMN "id_weapon",
DROP COLUMN "level",
DROP COLUMN "power",
DROP COLUMN "precision",
DROP COLUMN "resistance",
DROP COLUMN "strength",
DROP COLUMN "vitality",
ADD COLUMN     "id_character" INTEGER,
ADD COLUMN     "id_guild" INTEGER,
ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "character" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "vitality" INTEGER NOT NULL,
    "endurance" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "resistance" INTEGER NOT NULL,
    "precision" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "id_first_spell" INTEGER,
    "id_second_spell" INTEGER,
    "id_third_spell" INTEGER,
    "id_fourth_spell" INTEGER,
    "id_helmet" INTEGER NOT NULL,
    "id_chestplate" INTEGER NOT NULL,
    "id_leggings" INTEGER NOT NULL,
    "id_gloves" INTEGER NOT NULL,
    "id_weapon" INTEGER NOT NULL,
    "id_class" INTEGER NOT NULL,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild" (
    "id" SERIAL NOT NULL,
    "description" TEXT,

    CONSTRAINT "guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inventory_id_player_key" ON "inventory"("id_player");

-- CreateIndex
CREATE UNIQUE INDEX "player_id_character_key" ON "player"("id_character");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_first_spell_fkey" FOREIGN KEY ("id_first_spell") REFERENCES "spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_second_spell_fkey" FOREIGN KEY ("id_second_spell") REFERENCES "spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_third_spell_fkey" FOREIGN KEY ("id_third_spell") REFERENCES "spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_fourth_spell_fkey" FOREIGN KEY ("id_fourth_spell") REFERENCES "spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_class_fkey" FOREIGN KEY ("id_class") REFERENCES "hero_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_weapon_fkey" FOREIGN KEY ("id_weapon") REFERENCES "weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_helmet_fkey" FOREIGN KEY ("id_helmet") REFERENCES "armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_chestplate_fkey" FOREIGN KEY ("id_chestplate") REFERENCES "armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_leggings_fkey" FOREIGN KEY ("id_leggings") REFERENCES "armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_id_gloves_fkey" FOREIGN KEY ("id_gloves") REFERENCES "armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_character_fkey" FOREIGN KEY ("id_character") REFERENCES "character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_guild_fkey" FOREIGN KEY ("id_guild") REFERENCES "guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
