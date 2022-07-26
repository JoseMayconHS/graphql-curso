import { TContext } from '../../../../config/context'
import db, { table_users_profiles } from '../../../../config/db'
import { IUser_Profile } from '../../../../config/db/types'

interface ControllerData extends IUser_Profile {}

export default {
	async novoUsuarioPerfil(
		_,
		{ dados: { user_id, profile_id } }: { dados: ControllerData }
	): Promise<IUser_Profile> {
		const novo: IUser_Profile = {
			user_id,
			profile_id,
		}

		const [id] = await db(table_users_profiles).insert(novo)

		return {
			id,
			...novo,
		}
	},
	async excluirUsuarioPerfil(
		_,
		{ user_id }: { user_id: number },
		ctx?: TContext
	) {
		ctx && ctx.verifyAdm()

		const rows = await db(table_users_profiles).where('user_id', user_id).del()

		return !!rows
	},
	async alterarUsuarioPerfil(
		_,
		{ dados: { user_id, profile_id } }: { dados: ControllerData },
		ctx?: TContext
	) {
		ctx && ctx.verifyAdm()

		const result = await db(table_users_profiles)
			.where('user_id', user_id)
			.update({
				user_id,
				profile_id,
			})

		return !!result
	},
}
