/*
  Warnings:

  - You are about to drop the `radar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recommendations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `radar` DROP FOREIGN KEY `radar_storyId_fkey`;

-- DropForeignKey
ALTER TABLE `recommendations` DROP FOREIGN KEY `recommendations_storyId_fkey`;

-- AlterTable
ALTER TABLE `story` ADD COLUMN `isRadar` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isRecommended` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `radar`;

-- DropTable
DROP TABLE `recommendations`;

-- CreateIndex
CREATE INDEX `story_isRadar_updatedAt_idx` ON `story`(`isRadar`, `updatedAt` DESC);

-- CreateIndex
CREATE INDEX `story_isRecommended_updatedAt_idx` ON `story`(`isRecommended`, `updatedAt` DESC);
