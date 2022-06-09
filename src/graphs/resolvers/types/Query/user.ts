import bcryptjs from 'bcryptjs'

import { userLogged } from './../../../../utils/user'
import db, { table_users } from '../../../../config/db'

export default {  
  async login(_, { dados: { email, password } }) {
    const user = await db(table_users).where({
      email
    }).first()

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
    const results = await db(table_users).select('*')

    return results
  },
  async usuario(_, args, ctx) {
    console.log({ ctx })
    const result = await db(table_users).where('id', args.id).first()

    return result
  }
}
