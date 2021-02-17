'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeatingChartSchema extends Schema {
  up () {
    this.create('seating_charts', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('seating_charts')
  }
}

module.exports = SeatingChartSchema
