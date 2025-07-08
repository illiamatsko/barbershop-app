/*
  Warnings:

  - Added the required column `name` to the `BarberStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BarberStatus" ADD COLUMN     "name" TEXT NOT NULL;
