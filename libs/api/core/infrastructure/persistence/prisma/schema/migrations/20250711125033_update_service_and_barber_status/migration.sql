/*
  Warnings:

  - Added the required column `alias` to the `BarberStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isMain` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BarberStatus" ADD COLUMN     "alias" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "isMain" BOOLEAN NOT NULL;
