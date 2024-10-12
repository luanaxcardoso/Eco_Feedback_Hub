import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('produtos')
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    nome: string;

    @Column({ length: 100})
    marca: string;

    @Column('decimal', { precision: 10, scale: 2 })
    preco: number;

    @Column('int')
    quantidade: number;

    @CreateDateColumn()
    createdAt?: Date;

}
