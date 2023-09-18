-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Item_id_seq";
