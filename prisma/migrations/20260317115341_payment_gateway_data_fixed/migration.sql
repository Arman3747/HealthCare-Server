/*
  Warnings:

  - You are about to drop the column `paymentGateData` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentGateData",
ADD COLUMN     "paymentGatewayData" JSONB;
