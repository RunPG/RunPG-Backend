-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_id_item_type_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_first_spell_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_fourth_spell_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_second_spell_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_id_third_spell_fkey";

-- AlterTable
ALTER TABLE "inventory" ALTER COLUMN "id_item_type" DROP NOT NULL,
ALTER COLUMN "stack_size" DROP NOT NULL;

-- AlterTable
ALTER TABLE "player" ALTER COLUMN "id_first_spell" DROP NOT NULL,
ALTER COLUMN "id_second_spell" DROP NOT NULL,
ALTER COLUMN "id_third_spell" DROP NOT NULL,
ALTER COLUMN "id_fourth_spell" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_id_item_type_fkey" FOREIGN KEY ("id_item_type") REFERENCES "item_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_first_spell_fkey" FOREIGN KEY ("id_first_spell") REFERENCES "spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_second_spell_fkey" FOREIGN KEY ("id_second_spell") REFERENCES "spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_third_spell_fkey" FOREIGN KEY ("id_third_spell") REFERENCES "spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_id_fourth_spell_fkey" FOREIGN KEY ("id_fourth_spell") REFERENCES "spell"("id") ON DELETE SET NULL ON UPDATE CASCADE;
