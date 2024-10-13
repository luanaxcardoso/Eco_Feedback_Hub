import { Produto } from 'src/domain/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity('avaliacoes')
export class Avaliacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nome_Pessoa: string;

    @Column({ type: 'int' })
    idade: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    nota: string;

    @Column({ type: 'text' })
    comentario: string;

    @Column({ type: 'boolean' })
    origem_Animal: boolean;

    @Column({ type: 'boolean' })
    origem_Vegetal: boolean;

    @Column({ type: 'boolean' })
    embalagem_Reciclavel: boolean;

    @Column({ type: 'boolean' })
    nacional: boolean;

    @CreateDateColumn()
    createdAt?: Date;


    @ManyToOne(() => Produto)
    @JoinColumn({ name: 'produto_id' })  
    produto: Produto; 
    
}
