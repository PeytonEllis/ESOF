'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with seatingcharts
 */

const SeatingChart = use('App/Models/SeatingChart')
const { validate } = use('Validator')
var date

class SeatingChartController {

  async create ({ request, params }) {
  }

  async edit ({ params, view }) {
    const seating_chart = await SeatingChart.find(params.id)

    return view.render('edit-ticket', {
      seating_chart: seating_chart
    })
  }

  async update ({ params, request, response }) {

    const validation = await validate(request.all(), {
      Name: 'required',
      Phone_Number: 'required',
      Seat_type: 'required',
      Seats_rsv: 'required'
    })
    if(validation.fails()){
      return response.redirect('back')
    }

    const seating_chart = await SeatingChart.find(params.id)

    seating_chart.Name = request.all().Name
    seating_chart.Phone_Number = request.all().Phone_Number
    seating_chart.Seat_type = request.all().Seat_type
    seating_chart.Seats_rsv = request.all().Seats_rsv

    await seating_chart.save()
    return response.redirect('/future-shows')
  }

  async delete({ response, params}){
    const seating_chart = await SeatingChart.find(params.id)

    await seating_chart.delete()
    return response.redirect('back')
  }

}

module.exports = SeatingChartController
