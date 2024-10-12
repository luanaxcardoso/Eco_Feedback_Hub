import { MigrationInterface, QueryRunner } from "typeorm";

export class Produtos1728693939291 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE produtos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                marca VARCHAR(255) NOT NULL,
                preco DECIMAL(10, 2) NOT NULL,
                quantidade INT NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE produtos`);
    }
}
