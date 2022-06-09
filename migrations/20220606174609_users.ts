import { Knex } from "knex";

const table_name = 'users'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.timestamps(true, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table_name)
}

