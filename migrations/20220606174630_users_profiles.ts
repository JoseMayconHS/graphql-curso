import { Knex } from "knex";

const table_name = 'users_profiles'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, table => {
    table.integer('user_id').unsigned()
    table.integer('profile_id').unsigned()

    table.foreign('user_id').references('users.id')
    table.foreign('profile_id').references('profiles.id')

    table.primary(['user_id', 'profile_id'])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table_name)
}

