import { MigrationInterface, QueryRunner } from "typeorm";

export class Produtos1729262499006 implements MigrationInterface {
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

        
        await queryRunner.query(`
            INSERT INTO produtos (nome, marca, preco, quantidade, categoria) VALUES 
            ('Hamburguer de soja', 'Futuro Burguer', 20.00, 6, 'Alimento'),
            ('Leite de Castanha', 'Super Bom', 5.50, 15, 'Bebida'),
            ('Detergente', 'VidaVegg', 3.99, 10, 'Limpeza'),
            ('Shampoo', 'Phito', 12.50, 8, 'Cosmetico'),
            ('Sabonete', 'Botica', 2.80, 20, 'Outro');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`DELETE FROM produtos WHERE nome IN ('Hamburguer de soja', 'Suco de laranja', 'Detergente', 'Shampoo', 'Sabonete')`);

        
        await queryRunner.query(`DROP TABLE produtos`);
    }
}
