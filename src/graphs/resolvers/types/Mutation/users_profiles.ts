import { TContext } from './../../../../config/context';
import db, { table_users_profiles } from '../../../../config/db'
import { IUser_Profile } from './../../../../config/db/types'

export default {
  async novoUsuarioPerfil(_, { dados: { user_id, profile_id }}) {

    const novo: IUser_Profile = {
      user_id, profile_id
    }

    const id = await db(table_users_profiles)
      .insert(novo)

    const result = await db(table_users_profiles).where({
      id
    }).first()

    return result
  },
  async excluirUsuarioPerfil(_, { id }, ctx?: TContext) {
    ctx && ctx.verifyAdm()

    const rows = await db(table_users_profiles)
    .where('id', id)
    .del()

    return !!rows
  },
  async alterarUsuarioPerfil(_, { dados: { id, ...args }}, ctx?: TContext) {
    ctx && ctx.verifyAdm()
    const newData = {
      ...args
    }
    
    const result = await db(table_users_profiles)
    .where('id', id)
    .update(newData)

    return !!result
  }
}
