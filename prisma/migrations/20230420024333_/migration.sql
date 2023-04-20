/*
  Warnings:

  - The primary key for the `Alternative` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `media` on the `Alternative` table. All the data in the column will be lost.
  - You are about to alter the column `text` on the `Alternative` table. The data in that column could be lost. The data in that column will be cast from `VarChar(63)` to `VarChar(15)`.
  - The primary key for the `DoneExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lessonId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to alter the column `statement` on the `Exercise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(15)`.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `level` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `providedXp` on the `Lesson` table. All the data in the column will be lost.
  - The primary key for the `Medal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Medal` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `money` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ItemOnUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedalOnUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOnLesson` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `id` on the `Alternative` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `exerciseId` on the `Alternative` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `DoneExercise` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `userId` on the `DoneExercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `exerciseId` on the `DoneExercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Exercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `medalId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Medal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Medal` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Medal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePhoto` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Grammar" AS ENUM ('SVO', 'SOV', 'VSO', 'VOS', 'OSV', 'OVS');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK');

-- DropForeignKey
ALTER TABLE "Alternative" DROP CONSTRAINT "Alternative_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "DoneExercise" DROP CONSTRAINT "DoneExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "DoneExercise" DROP CONSTRAINT "DoneExercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "ItemOnUser" DROP CONSTRAINT "ItemOnUser_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemOnUser" DROP CONSTRAINT "ItemOnUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "MedalOnUser" DROP CONSTRAINT "MedalOnUser_medalId_fkey";

-- DropForeignKey
ALTER TABLE "MedalOnUser" DROP CONSTRAINT "MedalOnUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnLesson" DROP CONSTRAINT "UserOnLesson_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnLesson" DROP CONSTRAINT "UserOnLesson_userId_fkey";

-- AlterTable
ALTER TABLE "Alternative" DROP CONSTRAINT "Alternative_pkey",
DROP COLUMN "media",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "text" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "isCorrect" SET DEFAULT false,
DROP COLUMN "exerciseId",
ADD COLUMN     "exerciseId" UUID NOT NULL,
ADD CONSTRAINT "Alternative_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DoneExercise" DROP CONSTRAINT "DoneExercise_pkey",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "exerciseId",
ADD COLUMN     "exerciseId" UUID NOT NULL,
ADD CONSTRAINT "DoneExercise_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
DROP COLUMN "lessonId",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "statement" SET DATA TYPE VARCHAR(15),
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(15) NOT NULL,
ADD COLUMN     "professorId" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE REAL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_pkey",
DROP COLUMN "level",
DROP COLUMN "name",
DROP COLUMN "providedXp",
ADD COLUMN     "medalId" UUID NOT NULL,
ADD COLUMN     "title" VARCHAR(7) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Medal" DROP CONSTRAINT "Medal_pkey",
DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(15) NOT NULL,
ADD COLUMN     "professorId" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "isCumultative" SET DEFAULT false,
ADD CONSTRAINT "Medal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "avatar",
DROP COLUMN "experience",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "money",
DROP COLUMN "theme",
ADD COLUMN     "fullName" VARCHAR(63) NOT NULL,
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "profilePhoto" VARCHAR(255) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ItemOnUser";

-- DropTable
DROP TABLE "MedalOnUser";

-- DropTable
DROP TABLE "UserOnLesson";

-- DropEnum
DROP TYPE "UserTheme";

-- CreateTable
CREATE TABLE "Professor" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grammar" "Grammar",
    "userId" UUID NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experience" SMALLINT NOT NULL DEFAULT 0,
    "money" REAL NOT NULL DEFAULT 0,
    "theme" "Theme" NOT NULL DEFAULT 'LIGHT',
    "userId" UUID NOT NULL,
    "professorId" UUID NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemOnStudent" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "ItemOnStudent_pkey" PRIMARY KEY ("itemId","userId")
);

-- CreateTable
CREATE TABLE "MedalOnStudent" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medalId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "amount" SMALLINT NOT NULL,

    CONSTRAINT "MedalOnStudent_pkey" PRIMARY KEY ("medalId","userId")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" SMALLINT NOT NULL DEFAULT 1,
    "earnedXp" SMALLINT NOT NULL,
    "earnedMoney" REAL NOT NULL,
    "lessonId" UUID NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentOnLesson" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isUnlocked" BOOLEAN NOT NULL DEFAULT false,
    "currentLevel" SMALLINT NOT NULL,
    "studentId" UUID NOT NULL,
    "lessonId" UUID NOT NULL,

    CONSTRAINT "StudentOnLesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medal" ADD CONSTRAINT "Medal_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_medalId_fkey" FOREIGN KEY ("medalId") REFERENCES "Medal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternative" ADD CONSTRAINT "Alternative_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnLesson" ADD CONSTRAINT "StudentOnLesson_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnLesson" ADD CONSTRAINT "StudentOnLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
