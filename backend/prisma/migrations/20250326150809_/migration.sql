/*
  Warnings:

  - You are about to drop the column `enunciado` on the `alternativa` table. All the data in the column will be lost.
  - You are about to drop the column `idEvaluacion` on the `alternativa` table. All the data in the column will be lost.
  - You are about to drop the `evaluacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `respuesta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `respuestausuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idPreguntas` to the `alternativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texto` to the `alternativa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `alternativa` DROP FOREIGN KEY `Alternativa_idEvaluacion_fkey`;

-- DropForeignKey
ALTER TABLE `evaluacion` DROP FOREIGN KEY `Evaluacion_idCurso_fkey`;

-- DropForeignKey
ALTER TABLE `evaluacion` DROP FOREIGN KEY `Evaluacion_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `respuesta` DROP FOREIGN KEY `Respuesta_idAlternativa_fkey`;

-- DropForeignKey
ALTER TABLE `respuestausuario` DROP FOREIGN KEY `RespuestaUsuario_idAlternativa_fkey`;

-- DropForeignKey
ALTER TABLE `respuestausuario` DROP FOREIGN KEY `RespuestaUsuario_idEvaluacion_fkey`;

-- DropForeignKey
ALTER TABLE `respuestausuario` DROP FOREIGN KEY `RespuestaUsuario_idRespuesta_fkey`;

-- DropForeignKey
ALTER TABLE `respuestausuario` DROP FOREIGN KEY `RespuestaUsuario_idUsuario_fkey`;

-- DropIndex
DROP INDEX `Alternativa_idEvaluacion_fkey` ON `alternativa`;

-- AlterTable
ALTER TABLE `alternativa` DROP COLUMN `enunciado`,
    DROP COLUMN `idEvaluacion`,
    ADD COLUMN `idPreguntas` INTEGER NOT NULL,
    ADD COLUMN `seleccionada` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `texto` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `evaluacion`;

-- DropTable
DROP TABLE `respuesta`;

-- DropTable
DROP TABLE `respuestausuario`;

-- CreateTable
CREATE TABLE `pregunta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alternativa` ADD CONSTRAINT `alternativa_idPreguntas_fkey` FOREIGN KEY (`idPreguntas`) REFERENCES `pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
