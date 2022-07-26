const table_name = 'profiles'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable(table_name, (table) => {
			table.increments('id')
			table.string('name').notNullable().unique()
			table.string('label').notNullable()
			table.timestamps(true, true)
		})
		.then(() => {
			return knex(table_name).insert([
				{ label: 'comum', name: 'Comum' },
				{ label: 'adm', name: 'Administrador' },
			])
		})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists(table_name)
}
