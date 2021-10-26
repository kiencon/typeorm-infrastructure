import {MigrationInterface, QueryRunner} from "typeorm";

export class initDB1627144617590 implements MigrationInterface {
    name = 'initDB1627144617590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `detergent` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `number` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `detergent_formula` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(255) NOT NULL, `ratio` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `detergent_formula`");
        await queryRunner.query("DROP TABLE `detergent`");
    }

}
