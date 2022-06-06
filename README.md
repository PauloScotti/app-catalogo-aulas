This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Banco de Dados escolhido - MongoDB

1. Passos
1. Criar cadastro no site https://www.mongodb.com/
1. Criar um Cluster
1. Criar as variáveis de conexão nas ENVs
1. Criar os modelos das tabelas

## Cadastro de usuários (Rota: cadastroUsuarios)

Nesse cadastro, é possível criar contas sem estar logado e é necessário informar no body (form-data) o nome, email, senha e nível de acesso (nivelAcesso).
Para ter acesso a edição nas demais telas, é necessário criar usuar com nivel Administrador.
O método usado é o Post

## Cadastro de Módulos e Aulas (Rotas: cadastroModulos, cadastroAulas)

Para os cadastros de módulos e aulas, é necessário estar logado como Administrador.
Os dados devem ser passados como JSON
Para os módulos, deve-se informar nome e descrição do módulo
Já para as aulas, deve-se informar id do módulo na URL, nome, data da aula.
O método usado é o Post

## Deletar Módulos e Aulas (Rotas: deletarModulos, deletarAulas)

Para deletar módulos ou aulas, basta informar o id do módulo/aula na URL
O método usado é o Delete

## Atualizar usuários (Rota: usuarios)

Utilizar o form-data e informar os dados a serem atualizado (nome, nivelAcesso ou file)

## Buscar usuário logado (Rota: usuarios)

Basta acessar a rota usuarios após efetuar o login para visualizar os dados do usuário. OBS.: Apenas Administradores tem acesso a essa funcionalidade

## Editar Módulos e Aulas (Rotas: editarModulos, editarAulas)

Para atualizar módulos ou aulas, basta informar via JSON os dados a serem alterados
É possível alterar nome e descrição dos Módulos
Já das aulas, podem ser alterados apenas nome e data

## Listar Módulos e Aulas (Rotas: modulos, aulas)

Em ambos os casos, para pesquisar apenas é necessário acessar a rota específica
Nessas rotas não é necessário estar logado para acessar

## Política de CORS

Esse projeto inclui políticas de CORS para as requisições HTTP seguras.
