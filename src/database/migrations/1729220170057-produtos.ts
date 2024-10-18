import { MigrationInterface, QueryRunner } from "typeorm";

export class Produtos1729220170057 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE produtos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                marca VARCHAR(255) NOT NULL,
                preco DECIMAL(10, 2) NOT NULL,
                quantidade INT NOT NULL,
                categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('Alimento', 'Bebida', 'Limpeza', 'Cosmetico', 'Outro')) DEFAULT 'Outro'
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE produtos`);
    }

}
