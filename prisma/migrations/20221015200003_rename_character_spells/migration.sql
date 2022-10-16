/*
  Warnings:

  - You are about to drop the column `firstSpell` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `fourthSpell` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `secondSpell` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `thirdSpell` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "firstSpell",
DROP COLUMN "fourthSpell",
DROP COLUMN "secondSpell",
DROP COLUMN "thirdSpell",
ALTER COLUMN "firstSpellId" DROP NOT NULL,
ALTER COLUMN "secondSpellId" DROP NOT NULL,
ALTER COLUMN "thirdSpellId" DROP NOT NULL,
ALTER COLUMN "fourthSpellId" DROP NOT NULL;
