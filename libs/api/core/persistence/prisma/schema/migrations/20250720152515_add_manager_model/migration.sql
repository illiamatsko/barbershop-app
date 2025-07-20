/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[managerId]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `managerId` to the `Barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "managerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "Manager"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_name_key" ON "Barbershop"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_address_key" ON "Barbershop"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_managerId_key" ON "Barbershop"("managerId");

-- AddForeignKey
ALTER TABLE "Barbershop" ADD CONSTRAINT "Barbershop_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
