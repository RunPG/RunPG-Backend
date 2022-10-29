/*
  Warnings:

  - You are about to drop the column `cord` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `daarunEye` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `rock` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `wood` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "cord",
DROP COLUMN "daarunEye",
DROP COLUMN "rock",
DROP COLUMN "wood";
