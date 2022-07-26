import { gql } from 'apollo-server'

export const User = gql`
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

	input UsuarioLogin {
		email: String!
		password: String!
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

	type Query {
		usuarios: [Usuario]!
		usuario(id: ID!): Usuario

		login(dados: UsuarioLogin): UsuarioLogado
	}

	type Mutation {
		novoUsuario(dados: UsuarioCriar): Usuario!
		alterarUsuario(dados: UsuarioAlterar): Boolean!
		excluirUsuario(id: ID): Boolean!
	}
`
