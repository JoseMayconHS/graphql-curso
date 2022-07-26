import profile from './profile'
import user from './user'
import users_profiles from './user_profile'

export default {
	...user,
	...profile,
	...users_profiles,
}
