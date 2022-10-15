/*
  Warnings:

  - The `firstSpell` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fourthSpell` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `secondSpell` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `thirdSpell` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "firstSpell",
ADD COLUMN     "firstSpell" INTEGER,
DROP COLUMN "fourthSpell",
ADD COLUMN     "fourthSpell" INTEGER,
DROP COLUMN "secondSpell",
ADD COLUMN     "secondSpell" INTEGER,
DROP COLUMN "thirdSpell",
ADD COLUMN     "thirdSpell" INTEGER;
