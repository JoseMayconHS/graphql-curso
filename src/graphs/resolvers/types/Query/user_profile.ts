import db, { table_users_profiles } from '../../../../config/db'
import { IUser_Profile } from '../../../../config/db/types'

export default {
	async usuarios_perfis() {
		const results = (await db(table_users_profiles).select(
			'*'
		)) as IUser_Profile[]

		return results
	},
	async usuario_perfil(_, args: { id: number }) {
		const result = (await db(table_users_profiles)
			.where('id', args.id)
			.first()) as IUser_Profile

		return result
	},
}
