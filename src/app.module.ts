import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import 'dotenv/config'; 
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PessoasModule } from './pessoas/pessoas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env' }),
      DatabaseModule,
      PessoasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
