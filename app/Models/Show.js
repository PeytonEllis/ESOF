'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Show extends Model {

  seating_charts(){
    return this.hasMany('App/Models/SeatingChart')
  }

}


module.exports = Show
