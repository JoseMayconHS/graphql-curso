import db, { table_profiles } from '../../../../config/db'
import { IProfile } from '../../../../config/db/types'

export default {
	async perfis() {
		const results = (await db(table_profiles).select('*')) as IProfile[]

		return results
	},
	async perfil(_, args: { id: number }) {
		const result = (await db(table_profiles)
			.where('id', args.id)
			.first()) as IProfile

		return result
	},
}
