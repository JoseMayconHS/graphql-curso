import { TContext } from '../../../../config/context'
import db, { table_profiles } from '../../../../config/db'
import { IProfile } from './../../../../config/db/types'

export default {
	async novoPerfil(_, { dados: { label, name } }, ctx?: TContext) {
		ctx && ctx.verifyAdm()

		const already = await db(table_profiles)
			.where({
				label,
			})
			.first()
			.select('id')

		if (already) {
			throw new Error('Perfil já existe')
		}

		const novo: IProfile = {
			name,
			label,
		}

		const id = await db(table_profiles).insert(novo)

		const result = await db(table_profiles)
			.where({
				id,
			})
			.first()

		return result
	},
	async excluirPerfil(_, { id }, ctx?: TContext) {
		ctx && ctx.verifyAdm()

		const rows = await db(table_profiles).where('id', id).del()

		return !!rows
	},
	async alterarPerfil(_, { dados: { id, ...args } }, ctx?: TContext) {
		ctx && ctx.verifyAdm()

		const newData = {
			...args,
		}

		if (newData.label) {
			const already = await db(table_profiles)
				.where({
					label: newData.label,
				})
				.first()
				.select('id')

			if (already) {
				throw new Error('Perfil já existe')
			}
		}

		const result = await db(table_profiles).where('id', id).update(newData)

		return !!result
	},
}
