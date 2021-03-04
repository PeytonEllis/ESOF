'use strict'
//import Database from '@ioc:Adonis/Lucid/Database'
const Show = use('App/Models/Show')
var date

class ShowController {

  async index({view}){

    const future = await Show
      .query()
      .select('id', 'Show_title', 'Show_date')
      .from('shows')
      .where('isPast', 0)
      .fetch()

    return view.render('future-shows', {
      shows: future.toJSON()
    })
  }

  async details({ params, view }){

    const show = await Show.find(params.id)

    date = show.Show_date

    const current_show = await Show
      .query()
      .select('Name', 'Phone_Number', 'Seat_type', 'Seats_rsv')
      .from('seating_charts')
      .where('Show', '=', show.Show_date)
      .fetch()

    return view.render('add-ticket', {
      show: show.toJSON(),
      seating_charts: current_show.toJSON()
    })
  }

  async create ({ request, response, view }) {

    const data = request.only(['Show_title', 'Show_date'])
    data.isPast = 0

    // save and get instance back
    const show = await Show.create(data)
    return response.redirect('back')
  }

  async insert_ticket({request, response}) {
    const SeatingChart = use('App/Models/SeatingChart')
    const data = await request.only(['Name', 'Phone_Number', 'Seat_type', 'Seats_rsv'])
    data.Show = date
    await SeatingChart.create(data)

    return response.redirect('back')
  }
}

module.exports = ShowController
