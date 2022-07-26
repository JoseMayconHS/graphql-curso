import jwt from 'jwt-simple'

import db, { table_users_profiles } from '../config/db'
import { IProfile, IUser, IUser_Profile } from '../config/db/types'

import query_perfil from '../graphs/resolvers/types/Query/profile'

export interface IPayload extends IUser {
	perfil: IProfile
	iat: number
	exp: number
}

export interface UserLoggedResponse extends IPayload {
	token: string
}

export const userLogged = async (user: IUser): Promise<UserLoggedResponse> => {
	const user_profile = (await db(table_users_profiles)
		.where({
			user_id: user.id,
		})
		.first()) as IUser_Profile

	const perfil = await query_perfil.perfil(undefined, {
		id: user_profile.profile_id,
	})

	const now = Math.floor(Date.now() / 1000)

	const payload: IPayload = {
		...user,
		perfil,
		iat: now,
		exp: now + 3 * 24 * 60 * 60,
	}

	const token = jwt.encode(payload, process.env.APP_AUTH_SECRET)

	return {
		...payload,
		token,
	}
}
