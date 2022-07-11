/*
  Warnings:

  - You are about to drop the column `class` on the `Spell` table. All the data in the column will be lost.
  - Added the required column `heroClass` to the `Spell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spell" DROP COLUMN "class",
ADD COLUMN     "heroClass" "HeroClass" NOT NULL;
