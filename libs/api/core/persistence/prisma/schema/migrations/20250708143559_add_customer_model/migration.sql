/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Barber` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Barber` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Barber` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Barber` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Barber` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Barber` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Barber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Barber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[statusId]` on the table `Barber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_userEmail_fkey";

-- DropIndex
DROP INDEX "Barber_email_key";

-- DropIndex
DROP INDEX "Barber_phoneNumber_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "userEmail",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Barber" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "phoneNumber",
DROP COLUMN "role",
ADD COLUMN     "experience" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL,
    "barberId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_userId_key" ON "Barber"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_statusId_key" ON "Barber"("statusId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barber" ADD CONSTRAINT "Barber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
