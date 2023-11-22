import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1700607698631 implements MigrationInterface {
    name = 'InitDB1700607698631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `detergent_formula` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `ratio` int NOT NULL, `detergentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `detergent` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `number` int NOT NULL, INDEX `IDX_1ce1d857f6f4b531d3477aae75` (`number`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `detergent_formula` ADD CONSTRAINT `FK_129342e7cf855f34719d5e2d156` FOREIGN KEY (`detergentId`) REFERENCES `detergent`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `detergent_formula` DROP FOREIGN KEY `FK_129342e7cf855f34719d5e2d156`");
        await queryRunner.query("DROP INDEX `IDX_1ce1d857f6f4b531d3477aae75` ON `detergent`");
        await queryRunner.query("DROP TABLE `detergent`");
        await queryRunner.query("DROP TABLE `detergent_formula`");
    }

}
