
# Para rodar o projeto
npm run start:dev


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
`npm run typeorm migration:create src/database/migrations/produtos`

**Gerar e rodar as migratios**
`npm run typeorm -- -d ./src/database/dataSource.ts migration:run` `

**Instalar o class-validator e class-transformer**  
`npm install class-validator class-transformer`

---------------------------------------------------
**Criar um resource**
`nest g resource nome-do-resource`

---------------------------------------------------

**Instalar o Swagger**
`npm install @nestjs/swagger swagger-ui-express`
Documentação da API está disponível em: http://localhost:3000/swagger

---------------------------------------------------

**Testes**
`npm install @nestjs/testing`
`npm install jest @types/jest ts-jest`
`npm install supertest @types/supertest`

jest --watch,
jest --config jest.config.ts
npm run test:e2e
npm run test
