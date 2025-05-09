# Leany Test Project

## Instruções para Configuração e Execução

### 1. Clonar o Repositório

Para clonar o projeto, execute o seguinte comando no terminal:

```bash
git clone https://github.com/GabrielDena/leany-test
cd leany-test
```

### 2. Configurar o Banco de Dados com Docker

Certifique-se de que o Docker está instalado e em execução. Para iniciar o banco de dados, execute:

```bash
docker-compose up -d
```

### 3. Instalar Dependências

Troque para a versão do Node especificada no arquivo .nvmrc e instale as dependências:

```bash
nvm use
npm ci
```

### 4. Configurar Variáveis de Ambiente

Copie o arquivo .env.example para .env e configure as variáveis de ambiente necessárias:

```bash
cp .env.example .env
```

Observação: A única variável obrigatória a ser configurada no .env é o JWT_SECRET. As credenciais padrão do banco de dados estão configuradas como fallback, mas podem ser alteradas no .env.

### 5. Rodar Migrations

Com o banco rodando e as variáveis configuradas é necessário rodar as migrations para criação das tabelas:

```bash
npm run migration:run
```

### 6. Rodar a Aplicação

#### Para Desenvolvimento:

- Modo normal:

```bash
npm run start:dev
```

- Modo debug:

```bash
npm run start:debug
```

#### Para Produção:

- Compile o projeto:

```bash
npm run build
```

- Inicie a aplicação:

```bash
npm run start:prod
```

### 7. Acessar a Documentação Swagger

A documentação Swagger estará disponível no seguinte endpoint: http://localhost:3000/api

#### Observações Relevantes

Credenciais Padrão do Banco de Dados:

- Usuário: user
- Senha: password
- Banco de Dados: leanytest
- Essas credenciais podem ser configuradas no arquivo .env.

JWT_SECRET:

- É obrigatório configurar o JWT_SECRET no arquivo .env para que a aplicação funcione corretamente.

Porta Padrão:

- A aplicação será executada na porta 3000 por padrão. Caso deseje alterar, configure a variável PORT no arquivo .env.
