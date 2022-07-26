const table_name = 'users'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable(table_name, (table) => {
		table.increments('id')
		table.string('name').notNullable()
		table.string('email').notNullable().unique()
		table.string('password').notNullable()
		table.boolean('active').notNullable().defaultTo(true)
		table.timestamps(true, true)
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists(table_name)
}
