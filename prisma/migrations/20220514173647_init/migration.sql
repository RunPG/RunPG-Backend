-- CreateTable
CREATE TABLE "ItemType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ItemType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "itemTypeId" INTEGER NOT NULL,
    "stackSize" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "classId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroClass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HeroClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "vitality" INTEGER NOT NULL,
    "endurance" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "resistance" INTEGER NOT NULL,
    "precision" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "rarity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "vitality" INTEGER NOT NULL,
    "endurance" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "resistance" INTEGER NOT NULL,
    "precision" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "rarity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
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
    "vitality" INTEGER NOT NULL,
    "endurance" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "resistance" INTEGER NOT NULL,
    "precision" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "firstSpellId" INTEGER,
    "secondSpellId" INTEGER,
    "thirdSpellId" INTEGER,
    "fourthSpellId" INTEGER,
    "helmetId" INTEGER NOT NULL,
    "chestplateId" INTEGER NOT NULL,
    "leggingsId" INTEGER NOT NULL,
    "glovesId" INTEGER NOT NULL,
    "weaponId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "guildId" INTEGER,
    "characterId" INTEGER,
    "lastCaloriesUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" SERIAL NOT NULL,
    "description" TEXT,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemType_name_key" ON "ItemType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_userId_itemTypeId_key" ON "Inventory"("userId", "itemTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_classId_key" ON "Spell"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_name_key" ON "Spell"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HeroClass_name_key" ON "HeroClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_name_key" ON "Weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_name_key" ON "Armor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_userId_friendId_key" ON "Friend"("userId", "friendId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_characterId_key" ON "User"("characterId");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_classId_fkey" FOREIGN KEY ("classId") REFERENCES "HeroClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_classId_fkey" FOREIGN KEY ("classId") REFERENCES "HeroClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_firstSpellId_fkey" FOREIGN KEY ("firstSpellId") REFERENCES "Spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_secondSpellId_fkey" FOREIGN KEY ("secondSpellId") REFERENCES "Spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_thirdSpellId_fkey" FOREIGN KEY ("thirdSpellId") REFERENCES "Spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_fourthSpellId_fkey" FOREIGN KEY ("fourthSpellId") REFERENCES "Spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_classId_fkey" FOREIGN KEY ("classId") REFERENCES "HeroClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_helmetId_fkey" FOREIGN KEY ("helmetId") REFERENCES "Armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_chestplateId_fkey" FOREIGN KEY ("chestplateId") REFERENCES "Armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_leggingsId_fkey" FOREIGN KEY ("leggingsId") REFERENCES "Armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_glovesId_fkey" FOREIGN KEY ("glovesId") REFERENCES "Armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
