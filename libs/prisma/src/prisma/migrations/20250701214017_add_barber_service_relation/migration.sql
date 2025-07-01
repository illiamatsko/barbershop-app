/*
  Warnings:

  - You are about to drop the column `status` on the `Barber` table. All the data in the column will be lost.
  - You are about to drop the column `barberId` on the `Service` table. All the data in the column will be lost.
  - The primary key for the `ServicePrice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `barberStatus` on the `ServicePrice` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barberStatusId` to the `ServicePrice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_barberId_fkey";

-- AlterTable
ALTER TABLE "Barber" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "barberId";

-- AlterTable
ALTER TABLE "ServicePrice" DROP CONSTRAINT "ServicePrice_pkey",
DROP COLUMN "barberStatus",
ADD COLUMN     "barberStatusId" INTEGER NOT NULL,
ADD CONSTRAINT "ServicePrice_pkey" PRIMARY KEY ("serviceId", "barberStatusId");

-- DropEnum
DROP TYPE "BarberStatus";

-- CreateTable
CREATE TABLE "BarberStatus" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BarberStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BarberService" (
    "barberId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "BarberService_pkey" PRIMARY KEY ("barberId","serviceId")
);

-- AddForeignKey
ALTER TABLE "Barber" ADD CONSTRAINT "Barber_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "BarberStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarberService" ADD CONSTRAINT "BarberService_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarberService" ADD CONSTRAINT "BarberService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePrice" ADD CONSTRAINT "ServicePrice_barberStatusId_fkey" FOREIGN KEY ("barberStatusId") REFERENCES "BarberStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
