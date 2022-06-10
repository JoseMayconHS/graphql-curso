import jwt from 'jwt-simple'
import { Knex } from 'knex'
import { Request } from 'express'

type Filter = {
  id?: number,
  email?: string
}

export type TContext = {
  payload: object,
  admin: boolean,
  verifyUser(): Error | void,
  verifyAdm(): Error | void,
  verifyMySelf(props: Filter): Error | void
}

type ContextParams = {
  req: Request
}

const handle = ({ req }: ContextParams): TContext => {
  const auth = req.headers.authorization ?? `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6Ik1heWNvbiIsImVtYWlsIjoibWF5Y29uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDd3NnU2R29jaXRERXF5QzVhb09YeE8xNkJ4TXRrc0lzdUZMSmVPOFRGdWpnM0F3WnlQRlBDIiwiYWN0aXZlIjoxLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0wNyAyMzo0MDoyMCIsInVwZGF0ZWRfYXQiOiIyMDIyLTA2LTA3IDIzOjQwOjIwIiwicGVyZmlsIjp7ImlkIjoyLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImxhYmVsIjoiYWRtIiwiY3JlYXRlZF9hdCI6IjIwMjItMDYtMDcgMjI6MzI6MjQiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wNi0wNyAyMjozMjoyNCJ9LCJpYXQiOjE2NTQ2NDkwNDEsImV4cCI6MTY1NDkwODI0MX0.N9UAG2hWzbDkC1RtUY_Usu8oGUxjXlUtLZsb7uRN4v4`

  const token = auth?.substring(7)

  let payload, admin

  if (token) {
    try {
      payload = jwt.decode(token, process.env.APP_AUTH_SECRET)
    } catch(e) {
      console.log(e.message)
    }
  }

  if (payload) {
    admin = payload.perfil.label === 'adm'
  }

  const err = new Error('Acesso negado!')

  return {
    payload, admin,
    verifyUser() {
      if (!payload) throw err
    },
    verifyAdm() {
      if (!admin) throw err
    },
    verifyMySelf(filter) {
      if (admin) return

      if (!payload) throw err

      if (!filter) throw err

      const { id, email } = filter

      if (!id && !email) throw err

      if (id && payload.id !== id) throw err
      if (email && payload.email !== email) throw err
    }
  }
}

export default handle
