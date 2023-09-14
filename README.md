# ESS - Compartilhamento de reviews

## Alunos

- Heitor Brayner Prado (hbp)
- Mader Gabriel de Souza Barbosa (mgsb)
- Philippe Menge de Abreu e Lima (pmal)
- Luis Guilherme Monteiro Maciel Nunes (lgmmn)
- Henrique Carvalho de Melo (hcm)

### Dependencies

- [Nestjs](https://nestjs.com)
- [Angular](https://angular.io)
- [npm](https://www.npmjs.com)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Prisma](https://www.prisma.io)

### Instalando dependências
Nestjs
```bash
npm install -g @nestjs/cli
```
Angular
```bash
npm install -g @angular/cli
```
Prisma
```bash
npm install -g @prisma/client
```
Instale o Docker Desktop nesse [link](https://www.docker.com/products/docker-desktop/)

### Rodando o projeto
Primeiramente configure o arquivo .env e o .env.test na raiz do projeto
```bash
DATABASE_URL=""
JWT_SECRET=''
```
Inicie o ambiente de dev executando o comando
```bash
npm run db:dev:up
```
Inicie o servidor, no direório backend
```bash
npm start
```
Inicie o cliente, no direório frontend
```bash
ng serve
```
Inicie o ambiente de teste executando o comando
```bash
npm run db:test:up
```
Para acessar o projeto acesse o [localhost:4200](http://localhost:4200)

