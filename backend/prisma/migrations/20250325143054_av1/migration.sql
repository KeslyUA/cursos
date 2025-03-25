-- CreateTable
CREATE TABLE `agregados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idCurso` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agregados` ADD CONSTRAINT `agregados_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agregados` ADD CONSTRAINT `agregados_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
