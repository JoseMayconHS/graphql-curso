import bcryptjs from 'bcryptjs'

import db, { table_users } from '../../../../config/db'
import { IUser } from '../../../../config/db/types'
import { userLogged } from './../../../../utils/user'

export default {
	async login(
		_,
		{
			dados: { email, password },
		}: { dados: { email: string; password: string } }
	) {
		const user = await db(table_users)
			.where({
				email,
			})
			.first()

		if (!user) {
			throw new Error('Email não existe')
		}

		const isEqual = await bcryptjs.compare(password, user.password)

		if (!isEqual) {
			throw new Error('Senha incorreta')
		}

		return userLogged(user)
	},
	async usuarios() {
		const results = (await db(table_users).select('*')) as IUser[]

		return results
	},
	async usuario(_, args: { id: number }) {
		const result = (await db(table_users).where('id', args.id).first()) as IUser

		return result
	},
}
