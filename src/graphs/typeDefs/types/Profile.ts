import { gql } from 'apollo-server'

export const Profile = gql`
	input PerfilCriar {
		name: String!
		label: String!
	}

	input PerfilAlterar {
		id: ID!
		name: String
		label: String
	}

	type Perfil {
		id: ID!
		name: String!
		label: String!
	}

	type Query {
		perfis: [Perfil]!
		perfil(id: ID!): Perfil
	}

	type Mutation {
		novoPerfil(dados: PerfilCriar): Perfil!
		alterarPerfil(dados: PerfilAlterar): Boolean!
		excluirPerfil(id: ID): Boolean!
	}
`
