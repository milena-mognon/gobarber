<p align="center">
<img alt="GoStack" width="430" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<img width="400" alt="GoStack" src="../.github/logo.PNG" />
</p>

<h3 align="center">
  GOBARBER - Sistema para Barbearia
</h3>

## 🚀 Sobre

Backend da aplicação GoBarber.

## 💻 Principais Tecnologias Utilizadas

#### Lista das principais tecnologias utilizadas no desenvolvimento do backend do sistema.

- NodeJS - (Interpretador de JavaScript)
- ExpressJS - (Framework NodeJS)
- TypeScript - (Adiciona tipagem e alguns outros recursos ao JS)
  Eslint - (Ferramenta de análise de código)
- Prettier - (Code Formatter)
- Jest - (Estrutura de teste de JavaScript)
- Nodemailer - (Lib para envio de e-mails)
- Ethereal - (Serviço SMTP fake)
- Mailtrap - (Serviço SMTP fake)
- Multer - (Lib para upload de arquivos)
- Tsyringe - (Lib para injeção de dependências)
- Postgres - (Banco de dados relacional)
- TypeORM - (ORM)
- Json Web Token (técnica para autenticação)
- MongoDB - (Banco de dados não relacional)
- Handlebars - (Template de email)
- Celebrate - (Middleware para validação)
- Class Transformer - (Lib para transformar objetos)

## 🚀 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta do projeto pelo terminal;
3. Rode `yarn` para instalar as dependências;
4. Rode `yarn dev:server` para iniciar o servidor de desenvolvimento;

### ⚙ Configuração do banco de dados

1. Crie uma base de dados do Postgres;
2. No arquivo **ormconfig.json** modifique as credenciais (host, database, user, password);
3. Rode `yarn typeorm migration:run` para rodas as migrations;

### 🔔 Configurações para envio de notificações

1. Crie uma base de dados do MongoDB
2. No arquivo **ormconfig.json** modifique o nome database e host, se necessário.

#### Exemplo de código para envio de notificações

Adiciona em uma classe através de injeção de dependência

```ts
constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}
```

Envia a notificação passando os dados necessários.

```ts
await this.notificationsRepository.create({
  recipient_id,
  content: `Conteúdo da notificação`,
});
```

OBS: Os dados enviados podem váriar, basta modificar no modulo de notifications (Schema, Repository, etc).

### 🧪 Testes

1. Rode `yarn test` para executar os testes;
