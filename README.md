# Controle de Gastos Residenciais

Aplicação full stack para cadastro de moradores e controle de receitas e despesas de uma residência. O projeto foi organizado com separação entre API, regras de negócio e interface web, permitindo consultar moradores, registrar lançamentos financeiros e visualizar um resumo consolidado na dashboard inicial.

## 🏗️ Arquitetura e Tecnologias Utilizadas

### Visão geral

O projeto está dividido em duas aplicações principais:

- `BackEnd`: API REST responsável por regras de negócio, persistência e exposição dos endpoints.
- `FrontEnd`: aplicação web responsável pela navegação, formulários, listagens e dashboard.

### BackEnd

- `.NET 10`
- `ASP.NET Core Web API`
- `Entity Framework Core`
- `SQLite`

### FrontEnd

- `React`
- `TypeScript`
- `Fetch API` para consumo da API

### Arquitetura aplicada

- No `BackEnd`, o fluxo principal segue a ideia: `Controller -> Service -> DbContext`.
- Os `controllers` recebem a requisição HTTP e devolvem as respostas da API.
- Os `services` concentram as regras de negócio, como validações e montagem dos DTOs.
- O `AppDbContext` faz a comunicação com o banco SQLite via Entity Framework Core.
- No `FrontEnd`, a organização é por feature, com separação entre `components`, `hook`, `services` e `types`.

## 📁 Estrutura de Pastas

Estrutura simplificada do projeto:

```text
Controle_de_Gastos_Residenciais/
├── BackEnd/
│   ├── controllers/
│   ├── data/
│   ├── dtos/
│   ├── exceptions/
│   ├── interfaces/
│   ├── Migrations/
│   ├── models/
│   ├── services/
│   ├── tests/
│   ├── Program.cs
│   └── BackEnd.csproj
├── FrontEnd/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── feature/
│   │   │   ├── home/
│   │   │   ├── lancamento/
│   │   │   └── moradores/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## ✨ Funcionalidades Principais

### Dashboard inicial

- Exibe o resumo financeiro geral da casa.
- Calcula total de `receitas` e `despesas` com base nas transações cadastradas.
- Monta um resumo por morador, mostrando nome, idade, total de receitas e total de despesas.
- Exibe estado vazio quando ainda não existem moradores cadastrados.

### Cadastro de moradores

- Permite cadastrar moradores com `nome` e `idade`.
- Lista todos os moradores cadastrados.
- Impede cadastro duplicado de moradores com o mesmo nome.
- Permite excluir moradores existentes (com deleção em cascata automática de todas as suas transações vinculadas).

### Lançamentos financeiros

- Permite criar lançamentos com descrição, valor, tipo e morador relacionado.
- Trabalha com os tipos de transação `Receita` e `Despesa`.
- Lista o histórico de transações registradas.
- Permite excluir transações.
- Possui filtro/busca no histórico no frontend.

### Regras de negócio importantes

- Uma transação só pode ser criada se o morador relacionado existir.
- O backend bloqueia cadastro de `receita` para morador menor de idade.
- A API devolve mensagens de erro tratadas para facilitar o consumo pelo frontend.

## ✅ Pré-requisitos

Antes de rodar o projeto localmente, tenha instalado:

- `.NET SDK 10`
- `Node.js` versão `20` ou superior
- `npm`
- Ferramenta global do Entity Framework Core:

```bash
dotnet tool install --global dotnet-ef
```

Se você já tiver o `dotnet-ef` instalado, pode conferir com:

```bash
dotnet ef --version
```

## 🚀 Como Clonar e Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Fellypr/controle-gastos-residenciais.git
cd Controle_de_Gastos_Residenciais
```

## 🔧 Rodando o BackEnd

### 2. Acessar a pasta da API

```bash
cd BackEnd
```

### 3. Restaurar as dependências

```bash
dotnet restore
```


### 4. Rodar a API

```bash
dotnet run
```

Por padrão, a aplicação sobe em:

- `http://localhost:5116`
- `https://localhost:7035`

O frontend atualmente consome a API por:

```text
http://localhost:5116
```

## 💻 Rodando o FrontEnd

### 1. Voltar para a raiz do projeto

Se você ainda estiver dentro de `BackEnd/`:

```bash
cd ..
```

### 2. Entrar na pasta do frontend

```bash
cd FrontEnd
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Abrir no navegador

O Vite vai mostrar no terminal a URL local do projeto, normalmente algo como:

```text
http://localhost:5173
```

## 📌 Fluxo recomendado para rodar localmente

1. Suba primeiro o `BackEnd` com `dotnet run`.
2. Depois suba o `FrontEnd` com `npm run dev`.
3. Acesse a aplicação no navegador.
4. Cadastre moradores.
5. Depois registre receitas e despesas para visualizar a dashboard preenchida.

## 🧪 Observação sobre testes

O projeto possui uma pasta `BackEnd/tests` com testes simples voltados às regras principais de moradores e transações.
