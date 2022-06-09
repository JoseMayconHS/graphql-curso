import { Knex } from "knex";

const table_name = 'profiles'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, table => {
    table.increments('id')
    table.string('name').notNullable().unique()
    table.string('label').notNullable()
    table.timestamps(true, true)
  }).then(() => {
    return knex(table_name).insert([
      { label: 'comum', name: 'Comum' },
      { label: 'adm', name: 'Administrador' }
    ])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table_name)
}

