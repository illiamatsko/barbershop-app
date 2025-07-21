/*
  Warnings:

  - Added the required column `photoUrl` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "photoUrl" TEXT NOT NULL;
