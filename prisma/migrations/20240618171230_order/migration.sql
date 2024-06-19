/*
  Warnings:

  - Added the required column `stock` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "stock" INTEGER NOT NULL;
