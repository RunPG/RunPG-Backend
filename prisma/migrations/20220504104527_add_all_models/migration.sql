-- CreateTable
CREATE TABLE "item_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "item_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "id_player" INTEGER NOT NULL,
    "id_item_type" INTEGER NOT NULL,
    "stack_size" INTEGER NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spell" (
    "id" SERIAL NOT NULL,
    "id_class" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "hero_class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapon" (
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
    "description" TEXT,
    "id_class" INTEGER NOT NULL,

    CONSTRAINT "weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "armor" (
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
    "description" TEXT,
    "type" INTEGER NOT NULL,

    CONSTRAINT "armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friend" (
    "id_user" INTEGER NOT NULL,
    "id_friend" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "player" (
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
    "id_first_spell" INTEGER NOT NULL,
    "id_second_spell" INTEGER NOT NULL,
    "id_third_spell" INTEGER NOT NULL,
    "id_fourth_spell" INTEGER NOT NULL,
    "id_helmet" INTEGER NOT NULL,
    "id_chestplate" INTEGER NOT NULL,
    "id_leggings" INTEGER NOT NULL,
    "id_gloves" INTEGER NOT NULL,
    "id_weapon" INTEGER NOT NULL,
    "id_class" INTEGER NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_type_name_key" ON "item_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_id_player_id_item_type_key" ON "inventory"("id_player", "id_item_type");

-- CreateIndex
CREATE UNIQUE INDEX "spell_id_class_key" ON "spell"("id_class");

-- CreateIndex
CREATE UNIQUE INDEX "spell_name_key" ON "spell"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hero_class_name_key" ON "hero_class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "weapon_name_key" ON "weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "armor_name_key" ON "armor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "friend_id_user_id_friend_key" ON "friend"("id_user", "id_friend");

-- CreateIndex
CREATE UNIQUE INDEX "player_name_key" ON "player"("name");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_id_item_type_fkey" FOREIGN KEY ("id_item_type") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spell" ADD CONSTRAINT "spell_id_class_fkey" FOREIGN KEY ("id_class") REFERENCES "hero_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon" ADD CONSTRAINT "weapon_id_class_fkey" FOREIGN KEY ("id_class") REFERENCES "hero_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_id_friend_fkey" FOREIGN KEY ("id_friend") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_first_spell_fkey" FOREIGN KEY ("id_first_spell") REFERENCES "spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_second_spell_fkey" FOREIGN KEY ("id_second_spell") REFERENCES "spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_third_spell_fkey" FOREIGN KEY ("id_third_spell") REFERENCES "spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_fourth_spell_fkey" FOREIGN KEY ("id_fourth_spell") REFERENCES "spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_class_fkey" FOREIGN KEY ("id_class") REFERENCES "hero_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_weapon_fkey" FOREIGN KEY ("id_weapon") REFERENCES "weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_helmet_fkey" FOREIGN KEY ("id_helmet") REFERENCES "armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_chestplate_fkey" FOREIGN KEY ("id_chestplate") REFERENCES "armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_leggings_fkey" FOREIGN KEY ("id_leggings") REFERENCES "armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_gloves_fkey" FOREIGN KEY ("id_gloves") REFERENCES "armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
