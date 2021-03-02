'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeatingChartSchema extends Schema {
  up () {
    this.create('seating_charts', (table) => {
      table.increments('id')
      table.string('Name')
      table.string('Phone_Number')
      table.string('Seat_type')
      table.string('Seats_rsv')
      table.string('Show').references('Show_date').inTable('shows')
      table.timestamps()
    })
  }

  down () {
    this.drop('seating_charts')
  }
}

module.exports = SeatingChartSchema
