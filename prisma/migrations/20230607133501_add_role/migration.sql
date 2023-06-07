-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'PROFESSOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role";
