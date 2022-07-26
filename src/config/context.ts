import { Request } from 'express'
import jwt from 'jwt-simple'

type Filter = {
	id?: number
	email?: string
}

export type TContext = {
	payload: object
	admin: boolean
	verifyUser(): Error | void
	verifyAdm(): Error | void
	verifyMySelf(props: Filter): Error | void
}

type ContextParams = {
	req: Request
}

const handle = ({ req }: ContextParams): TContext => {
	const auth = req.headers.authorization ?? ''

	const token = auth?.substring(7)

	let payload, admin

	if (token) {
		try {
			payload = jwt.decode(token, process.env.APP_AUTH_SECRET)
		} catch (e) {
			console.log(e.message)
		}
	}

	if (payload) {
		admin = payload.perfil.label === 'adm'
	}

	const err = new Error('Acesso negado!')

	return {
		payload,
		admin,
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
		},
	}
}

export default handle
