import { Avaliacao } from "src/domain/entities/avaliacoes.entity";
import { CategoriaProduto } from "src/domain/enum/categoria-produto.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("produtos")
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100 })
  marca: string;

  @Column("decimal", { precision: 10, scale: 2 })
  preco: number;

  @Column("int")
  quantidade: number;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({
    type: "enum",
    enum: CategoriaProduto,
  })
  categoria: CategoriaProduto;

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.produto)
  avaliacoes: Avaliacao[];
}
