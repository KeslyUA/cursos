-- CreateTable
CREATE TABLE `cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(70) NULL,
    `descripcion` VARCHAR(100) NULL,
    `area` VARCHAR(50) NULL,
    `duracion` VARCHAR(50) NULL,
    `fechaPublica` DATETIME(0) NULL,
    `fechaCierre` DATETIME(0) NULL,
    `certificado` VARCHAR(50) NULL,
    `cursoLibre` VARCHAR(50) NULL,
    `evaluacion` VARCHAR(50) NULL,
    `obligatorio` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
