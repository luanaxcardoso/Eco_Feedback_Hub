import { forwardRef, Module } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesController } from './avaliacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacoes.entity';
import { ProdutosModule } from 'src/modules/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avaliacao]),
    forwardRef(() => ProdutosModule),
  ],
  controllers: [AvaliacoesController],
  providers: [AvaliacoesService],
  exports: [AvaliacoesService],
})
export class AvaliacoesModule {}
