import { gql } from 'apollo-server'

export const User_Profile = gql`
	input UsuarioPerfilCriar {
		user_id: ID!
		profile_id: ID!
	}

	input UsuarioPerfilAlterar {
		user_id: ID!
		profile_id: ID
	}

	type UsuarioPerfil {
		user_id: ID!
		profile_id: ID!
	}

	type Query {
		usuarios_perfis: [UsuarioPerfil]!
		usuario_perfil(id: ID!): UsuarioPerfil
	}

	type Mutation {
		novoUsuarioPerfil(dados: UsuarioPerfilCriar): UsuarioPerfil!
		alterarUsuarioPerfil(dados: UsuarioPerfilAlterar): Boolean!
		excluirUsuarioPerfil(user_id: ID): Boolean!
	}
`
