import { MigrationInterface, QueryRunner } from "typeorm";

export class Avaliacoes1729262525994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE avaliacoes (
                id SERIAL PRIMARY KEY,
                nome_Pessoa VARCHAR(255) NOT NULL,
                idade INT NOT NULL,
                email VARCHAR(255) NOT NULL,
                nota VARCHAR(50) NOT NULL,
                comentario TEXT NOT NULL,
                origem_Animal BOOLEAN NOT NULL,
                origem_Vegetal BOOLEAN NOT NULL,
                embalagem_Reciclavel BOOLEAN NOT NULL,
                nacional BOOLEAN NOT NULL,
                produto_id INT,  
                created_at TIMESTAMP DEFAULT now(),  
                CONSTRAINT fk_produto FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE avaliacoes
        `);
    }

}
