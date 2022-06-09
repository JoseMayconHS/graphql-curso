import db, { table_users_profiles } from '../../../../config/db'

export default {
  async usuarios_perfis() {
    const results = await db(table_users_profiles).select('*')

    return results
  },
  async usuario_perfil(_, args) {
    const result = await db(table_users_profiles).where('id', args.id).first()
  
    return result
  }
}
