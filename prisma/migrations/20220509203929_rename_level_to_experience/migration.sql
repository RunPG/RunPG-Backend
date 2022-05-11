/*
  Warnings:

  - You are about to drop the column `level` on the `character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "character" DROP COLUMN "level",
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0;
