import dotenv from 'dotenv'
import knex from 'knex'
import { TTableName } from './types'

dotenv.config()

import knexConfig from '../../../knexfile'

const db = knex(knexConfig.development)

export const table_users: TTableName = 'users'
export const table_profiles: TTableName = 'profiles'
export const table_users_profiles: TTableName = 'users_profiles'

export default db
