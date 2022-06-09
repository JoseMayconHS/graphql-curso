import { gql } from "apollo-server";

export default gql`
  input UsuarioAlterar {
    id: ID!
    name: String
    email: String
    password: String
  }

  input UsuarioCriar {
    name: String!
    email: String!
    password: String!
    perfil: ID!
  }

  input PerfilCriar {
    name: String!
    label: String!
  }

  input PerfilAlterar {
    id: ID!
    name: String
    label: String
  }

  input UsuarioPerfilCriar {
    user_id: ID!
    profile_id: ID!
  }

  input UsuarioPerfilAlterar {
    id: ID!
    user_id: ID
    profile_id: ID
  }

  input UsuarioLogin {
    email: String!,
    password: String!
  }

  enum Status {
    ATIVO
    INATIVO
    BLOQUEADO
  }

  type Perfil {
    id: ID!
    name: String!
    label: String!
  }

  type UsuarioPerfil {
    user_id: ID!
    profile_id: ID!
  }

  type Usuario {
    id: ID
    name: String!
    email: String!
    password: String!
    created_at: String!
    updated_at: String!
  }

  type UsuarioLogado {
    id: ID
    name: String!
    email: String!
    password: String!
    created_at: String!
    updated_at: String!
    token: String!
    perfil: Perfil
  }

  # Pontos de entrada da sua API
  type Query {
    usuarios: [Usuario]!
    usuario(id: ID!): Usuario

    perfis: [Perfil]!
    perfil(id: ID!): Perfil

    usuarios_perfis: [UsuarioPerfil]!
    usuario_perfil(id: ID!): UsuarioPerfil

    login(dados: UsuarioLogin): UsuarioLogado
  }

  type Mutation {
    novoUsuario(dados: UsuarioCriar): Usuario!
    alterarUsuario(dados: UsuarioAlterar): Boolean!
    excluirUsuario(id: ID): Boolean!

    novoPerfil(dados: PerfilCriar): Perfil!
    alterarPerfil(dados: PerfilAlterar): Boolean!
    excluirPerfil(id: ID): Boolean!

    novoUsuarioPerfil(dados: UsuarioPerfilCriar): UsuarioPerfil!
    alterarUsuarioPerfil(dados: UsuarioPerfilAlterar): Boolean!
    excluirUsuarioPerfil(id: ID): Boolean!
  }
`;
