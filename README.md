
# Graphql Curso

API desenvolvida durante um curso de Graphql


## Documentação da API

API de controle de acesso, baseados em token e perfils Administrador e Comum.


## Funcionalidades

- Usuários de pefil `Comum` não podem excluir outros usuários a não ser ele mesmo;
- Somente usuários de perfil `Administrador` podem realizar `Mutations` em `Perfils` e na tabela de relacionamento `Usuário_Perfil`.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`KNEX_CLIENT`
`KNEX_DATABASE`
`KNEX_USER`
`KNEX_PASSWORD`

`PORT`

`APP_AUTH_SECRET`



## Tecnologias utilizadas

- Graphql;
- Typescript;
- Knex.

