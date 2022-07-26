import bcryptjs from 'bcryptjs'
import { TContext } from '../../../../config/context'

import db, { table_users } from '../../../../config/db'
import { IUser } from '../../../../config/db/types'

import users_profiles from './user_profile'

export default {
	async novoUsuario(_, { dados: { name, email, password, perfil } }) {
		const already = await db(table_users)
			.where({
				email,
			})
			.first()
			.select('id')

		if (already) {
			throw new Error('Email já existe')
		}

		const salt = await bcryptjs.genSalt()

		password = await bcryptjs.hash(password, salt)

		const novo: IUser = {
			name,
			email,
			password,
		}

		const id = (await db(table_users).insert(novo)) as number

		const result = await db(table_users)
			.where({
				id,
			})
			.first()

		await users_profiles.novoUsuarioPerfil(_, {
			dados: {
				user_id: result.id,
				profile_id: perfil,
			},
		})

		return result
	},
	async excluirUsuario(_, { id }, ctx?: TContext) {
		ctx && (ctx.verifyAdm() || ctx.verifyMySelf({ id }))

		const rows = await db(table_users).where('id', id).del()

		if (!!rows) {
			await users_profiles.excluirUsuarioPerfil(_, { user_id: id })
		}

		return !!rows
	},
	async alterarUsuario(_, { dados: { id, ...args } }, ctx?: TContext) {
		ctx && ctx.verifyMySelf({ id, email: args.email })

		const newData = {
			...args,
		}

		if (newData.email) {
			const already = await db(table_users)
				.where({
					email: newData.email,
				})
				.first()
				.select('id')

			if (already) {
				throw new Error('Email já existe')
			}
		}

		if (newData.password) {
			const salt = await bcryptjs.genSalt()

			newData.password = await bcryptjs.hash(newData.password, salt)
		}

		const result = await db(table_users).where('id', id).update(newData)

		return !!result
	},
}
