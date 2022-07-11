/*
  Warnings:

  - You are about to drop the column `class` on the `Character` table. All the data in the column will be lost.
  - Added the required column `heroClass` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "class",
ADD COLUMN     "heroClass" "HeroClass" NOT NULL;
