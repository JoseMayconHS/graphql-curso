import { TContext } from './../../../../config/context';
import db, { table_profiles } from '../../../../config/db'

export default {
  async perfis() {
    const results = await db(table_profiles).select('*')

    return results
  },
  async perfil(_, args, ctx?: TContext) {
    const result = await db(table_profiles).where('id', args.id).first()
  
    return result
  },
}
