import { gql } from 'apollo-server'

import { Profile } from './types/Profile'
import { User } from './types/User'
import { User_Profile } from './types/User_Profile'

export default gql`
	${User_Profile}
	${Profile}
	${User}
`
