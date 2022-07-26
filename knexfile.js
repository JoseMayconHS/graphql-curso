// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	production: {
		client: process.env.KNEX_CLIENT,
		connection: {
			database: process.env.KNEX_DATABASE,
			user: process.env.KNEX_USER,
			password: process.env.KNEX_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
	development: {
		client: 'sqlite3',
		connection: {
			filename: 'db.sqlite',
		},
		useNullAsDefault: true,
		migrations: {
			tableName: 'knex_migrations',
			extension: 'ts',
		},
	},
}
