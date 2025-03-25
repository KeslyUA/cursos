/*
  Warnings:

  - Made the column `idUsuario` on table `cursos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cursos` DROP FOREIGN KEY `cursos_idUsuario_fkey`;

-- DropIndex
DROP INDEX `cursos_idUsuario_fkey` ON `cursos`;

-- AlterTable
ALTER TABLE `cursos` MODIFY `idUsuario` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Evaluacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idCurso` INTEGER NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alternativa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEvaluacion` INTEGER NOT NULL,
    `enunciado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idAlternativa` INTEGER NOT NULL,
    `correcta` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RespuestaUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idEvaluacion` INTEGER NOT NULL,
    `idAlternativa` INTEGER NOT NULL,
    `idRespuesta` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alternativa` ADD CONSTRAINT `Alternativa_idEvaluacion_fkey` FOREIGN KEY (`idEvaluacion`) REFERENCES `Evaluacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_idAlternativa_fkey` FOREIGN KEY (`idAlternativa`) REFERENCES `Alternativa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestaUsuario` ADD CONSTRAINT `RespuestaUsuario_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestaUsuario` ADD CONSTRAINT `RespuestaUsuario_idEvaluacion_fkey` FOREIGN KEY (`idEvaluacion`) REFERENCES `Evaluacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestaUsuario` ADD CONSTRAINT `RespuestaUsuario_idAlternativa_fkey` FOREIGN KEY (`idAlternativa`) REFERENCES `Alternativa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestaUsuario` ADD CONSTRAINT `RespuestaUsuario_idRespuesta_fkey` FOREIGN KEY (`idRespuesta`) REFERENCES `Respuesta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
