const table_name = 'users_profiles'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable(table_name, (table) => {
		table.integer('user_id').unsigned()
		table.integer('profile_id').unsigned()

		table.foreign('user_id').references('users.id')
		table.foreign('profile_id').references('profiles.id')

		table.primary(['user_id', 'profile_id'])
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists(table_name)
}
