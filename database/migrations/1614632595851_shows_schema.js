'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShowsSchema extends Schema {
  up () {
    this.create('shows', (table) => {
      table.increments('id')
      table.string('Show_title')
      table.string('Show_date').unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('shows')
  }
}

module.exports = ShowsSchema
