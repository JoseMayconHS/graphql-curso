import { table_users_profiles } from '../config/db/index';
import jwt from 'jwt-simple'
import db from '../config/db'

import query_perfil from '../graphs/resolvers/types/Query/profile'

export const userLogged = async (user) => {
  const user_profile = await db(table_users_profiles).where({
    user_id: user.id
  }).first()

  const perfil = await query_perfil.perfil(undefined, { id: user_profile.profile_id })

  const now = Math.floor(Date.now() / 1000)

  const payload = {
    ...user,
    perfil,
    iat: now,
    exp: now + (3 * 24 * 60 * 60)
  }

  const token = jwt.encode(payload, process.env.APP_AUTH_SECRET)

  return {
    ...payload,
    token
  }
}
