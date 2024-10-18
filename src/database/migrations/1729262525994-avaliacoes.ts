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

        
        await queryRunner.query(`
            INSERT INTO avaliacoes (nome_Pessoa, idade, email, nota, comentario, origem_Animal, origem_Vegetal, embalagem_Reciclavel, nacional, produto_id) VALUES 
            ('Maria Silva', 30, 'mari@gmail.com', '5', 'Produto excelente!', true, false, true, true, 2),
            ('Joana Souza', 25, 'joa@gmail.com', '4', 'Bom, mas pode melhorar.', false, true, false, true, 2),
            ('Ana Oliveira', 28, 'anaoliver@gmail.com', '3', 'Atendeu minhas expectativas.', true, true, true, false, 2),
            ('Lucia Pereira', 35, 'luci.pereira@gmail.com', '5', 'Recomendo para todos!', true, false, true, true, 2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM avaliacoes WHERE email IN ('mari@gmail.com', 'joa@gmail.com', 'anaoliver@gmail.com', 'luci.pereira@gmail.com');
        `);

        await queryRunner.query(`DROP TABLE avaliacoes`);
    }
}
