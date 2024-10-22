/*
  Warnings:

  - Added the required column `type` to the `database_history` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ACTION" AS ENUM ('POST', 'REGISTRATION');

-- AlterTable
ALTER TABLE "database_history" ADD COLUMN     "type" "ACTION" NOT NULL;
