/*
  Warnings:

  - Made the column `heroClass` on table `EquipmentBase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EquipmentBase" ALTER COLUMN "heroClass" SET NOT NULL;
