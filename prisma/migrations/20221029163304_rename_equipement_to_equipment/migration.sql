/*
  Warnings:

  - You are about to drop the column `equipementId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the `Equipement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EquipementBase` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('WEAPON', 'HELMET', 'CHESTPLATE', 'LEGGINGS', 'GLOVES');

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_chestplateId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_glovesId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_helmetId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_leggingsId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_weaponId_fkey";

-- DropForeignKey
ALTER TABLE "Equipement" DROP CONSTRAINT "Equipement_equipementBaseId_fkey";

-- DropForeignKey
ALTER TABLE "Equipement" DROP CONSTRAINT "Equipement_statisticsId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_equipementId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "equipementId",
ADD COLUMN     "equipmentId" INTEGER;

-- DropTable
DROP TABLE "Equipement";

-- DropTable
DROP TABLE "EquipementBase";

-- DropEnum
DROP TYPE "EquipementType";

-- CreateTable
CREATE TABLE "EquipmentBase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "heroClass" "HeroClass",
    "equipmentType" "EquipmentType" NOT NULL,

    CONSTRAINT "EquipmentBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "equipmentBaseId" INTEGER NOT NULL,
    "statisticsId" INTEGER NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentBase_name_key" ON "EquipmentBase"("name");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_statisticsId_fkey" FOREIGN KEY ("statisticsId") REFERENCES "Statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_equipmentBaseId_fkey" FOREIGN KEY ("equipmentBaseId") REFERENCES "EquipmentBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_helmetId_fkey" FOREIGN KEY ("helmetId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_chestplateId_fkey" FOREIGN KEY ("chestplateId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_leggingsId_fkey" FOREIGN KEY ("leggingsId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_glovesId_fkey" FOREIGN KEY ("glovesId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
