CREATE DATABASE contactsdb;
GRANT ALL PRIVILEGES ON contactsdb.* TO 'user'@'%';
USE contactsdb;

CREATE TABLE `company` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `companyName` VARCHAR(100),
    `cif` VARCHAR(20),
    `address` VARCHAR(100),
    `city` VARCHAR(50),
    `phone` VARCHAR(20),
    `email` VARCHAR(100)
);

CREATE TABLE `contacts` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50),
    `lastname` VARCHAR(50),
    `phone` VARCHAR(11),
    `email` VARCHAR(50),
    `birthday` DATE,
    `favorite` INT DEFAULT 0,
    `companyId` INT NOT NULL,
    CONSTRAINT `FK_COMPANYID` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`)
);

INSERT INTO `company` (`companyName`, `cif`, `address`, `city`, `phone`, `email`) VALUES
('TechNova', 'CIF12345A', 'Calle Futura 101', 'Madrid', '911234567', 'contacto@technova.com'),
('GreenEnergy', 'CIF67890B', 'Avenida Solar 22', 'Valencia', '961234567', 'info@greenenergy.com');

INSERT INTO `contacts` (`name`, `lastname`, `phone`, `email`, `birthday`, `favorite`, `companyId`) VALUES
('Carlos', 'Ramírez', '611111111', 'carlos.ramirez@example.com', '1985-05-10', 1, 1),
('Lucía', 'Fernández', '611111112', 'lucia.fernandez@example.com', '1990-08-20', 0, 1),
('Miguel', 'Gómez', '622222221', 'miguel.gomez@example.com', '1983-11-14', 1, 2);