/*
  Warnings:

  - You are about to drop the `Spell` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_firstSpellId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_fourthSpellId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_secondSpellId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_thirdSpellId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "firstSpell" TEXT,
ADD COLUMN     "fourthSpell" TEXT,
ADD COLUMN     "secondSpell" TEXT,
ADD COLUMN     "thirdSpell" TEXT;

-- DropTable
DROP TABLE "Spell";
