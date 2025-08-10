/*
  Warnings:

  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `media_storyId_fkey`;

-- DropTable
DROP TABLE `media`;
