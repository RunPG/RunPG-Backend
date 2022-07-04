-- CreateEnum
CREATE TYPE "EquipementType" AS ENUM ('WEAPON', 'HELMET', 'CHESTPLATE', 'LEGGINGS', 'GLOVES');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FRIENDLIST', 'LOBBY', 'GUILD');

-- CreateEnum
CREATE TYPE "HeroClass" AS ENUM ('MAGE', 'BERSERKER', 'PRIEST', 'ROGUE', 'PALADIN');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY', 'RELIC');

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "stackSize" INTEGER NOT NULL,
    "equipementId" INTEGER,
    "itemId" INTEGER,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
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

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isConsomable" BOOLEAN NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipementBase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "heroClass" "HeroClass" NOT NULL,
    "equipementType" "EquipementType" NOT NULL,

    CONSTRAINT "EquipementBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipement" (
    "id" SERIAL NOT NULL,
    "equipementBaseId" INTEGER NOT NULL,
    "statisticsId" INTEGER NOT NULL,

    CONSTRAINT "Equipement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "class" "HeroClass" NOT NULL,
    "manaCost" INTEGER NOT NULL,
    "cooldown" INTEGER NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "userId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "statisticsId" INTEGER NOT NULL,
    "firstSpellId" INTEGER NOT NULL,
    "secondSpellId" INTEGER NOT NULL,
    "thirdSpellId" INTEGER NOT NULL,
    "fourthSpellId" INTEGER NOT NULL,
    "helmetId" INTEGER NOT NULL,
    "chestplateId" INTEGER NOT NULL,
    "leggingsId" INTEGER NOT NULL,
    "glovesId" INTEGER NOT NULL,
    "weaponId" INTEGER NOT NULL,
    "class" "HeroClass" NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "guildId" INTEGER,
    "characterId" INTEGER,
    "lastCaloriesUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isGuildOwner" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "type" "NotificationType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EquipementBase_name_key" ON "EquipementBase"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_name_key" ON "Spell"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_userId_friendId_key" ON "Friend"("userId", "friendId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_characterId_key" ON "User"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_name_key" ON "Guild"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_senderId_receiverId_type_key" ON "Notification"("senderId", "receiverId", "type");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_equipementId_fkey" FOREIGN KEY ("equipementId") REFERENCES "Equipement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipement" ADD CONSTRAINT "Equipement_statisticsId_fkey" FOREIGN KEY ("statisticsId") REFERENCES "Statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipement" ADD CONSTRAINT "Equipement_equipementBaseId_fkey" FOREIGN KEY ("equipementBaseId") REFERENCES "EquipementBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_statisticsId_fkey" FOREIGN KEY ("statisticsId") REFERENCES "Statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_helmetId_fkey" FOREIGN KEY ("helmetId") REFERENCES "Equipement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_chestplateId_fkey" FOREIGN KEY ("chestplateId") REFERENCES "Equipement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_leggingsId_fkey" FOREIGN KEY ("leggingsId") REFERENCES "Equipement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_glovesId_fkey" FOREIGN KEY ("glovesId") REFERENCES "Equipement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Equipement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_firstSpellId_fkey" FOREIGN KEY ("firstSpellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_secondSpellId_fkey" FOREIGN KEY ("secondSpellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_thirdSpellId_fkey" FOREIGN KEY ("thirdSpellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_fourthSpellId_fkey" FOREIGN KEY ("fourthSpellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
