# Guia de Configuração do Projeto NestJS

**Abrir o terminal**  
`npm install -g @nestjs/cli`

**Criar o projeto dentro da pasta**  
`nest new .`

**Rodar o projeto**  
`npm run start:dev`  
`npm run start`

**Instalar eslint e prettier**  
`npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev`  
`npx eslint --init`

**Instalar o dotenv**
`npm install dotenv`

**Instalar o NestJS Config**
`npm install @nestjs/config`

**Configurar o arquivo .env**
`...`

**Instalar o TypeORM e Postgres**  
`npm install @nestjs/typeorm typeorm pg`

**Criar migratios**
`npm run typeorm migration:create src/database/migrations/nome-da-migration`

**Gerar e rodar as migratios**
`npm run typeorm -- -d ./src/database/dataSource.ts migration:run` `

**Instalar o class-validator e class-transformer**  
`npm install class-validator class-transformer`

---------------------------------------------------
**Criar um resource**
`nest g resource nome-do-resource`

---------------------------------------------------

