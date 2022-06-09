interface IKnexSchema {
  id?: number,
  created_at?: string,
  updated_at?: string
}

export interface IUser extends IKnexSchema {
  name: string,
  email: string,
  password: string
}

export interface IProfile extends IKnexSchema {
  name: string,
  label: string
}

export interface IUser_Profile {
  user_id: number,
  profile_id: number
}

export type TTableName =  'users' | 'profiles' | 'users_profiles'
