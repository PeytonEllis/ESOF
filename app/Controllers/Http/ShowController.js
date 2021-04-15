'use strict'
//import Database from '@ioc:Adonis/Lucid/Database'
const Show = use('App/Models/Show')
const { validate } = use('Validator')
var date
var showToPrint

class ShowController {

  /*
  * query to retrieve all data for the future-shows page
  */
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

  /*
  * retrieves all shows that have been marked as completed
  */
  async pastIndex({view}){
    const past = await Show
      .query()
      .select('id', 'Show_title', 'Show_date')
      .from('shows')
      .where('isPast', 1)
      .fetch()

    return view.render('previous-shows', {
      shows: past.toJSON()
    })
  }

  /*
  * gets all information for add-tickets page to display tickets for selected show
  */
  async details({ params, view }){

    const show = await Show.find(params.id)

    date = show.Show_date

    const current_show = await Show
      .query()
      .select('*')
      .from('seating_charts')
      .where('Show', '=', show.Show_date)
      .fetch()

    return view.render('add-ticket', {
      show: show.toJSON(),
      seating_charts: current_show.toJSON()
    })
  }

  /*
  * Creates new show with validators.
  */
  async create ({ request, response}) {
    //validate input
    const validation = await validate(request.all(), {
      Show_title: 'required',
      Show_date: 'required'
    })
    if(validation.fails()){
      return response.redirect('back')
    }

    const data = request.only(['Show_title', 'Show_date'])
    data.isPast = 0

    // save and get instance back
    const show = await Show.create(data)
    return response.redirect('back')
  }

  /*
  * Helper function to declare a show completed
  */
  async isPast ({params, response}){
    const show = await Show.find(params.id)

    show.isPast = 1

    await show.save()
    return response.redirect('back')
  }

  async oops ({params, response}){
    const show = await Show.find(params.id)

    show.isPast = 0

    await show.save()
    return response.redirect('back')
  }

  /*
  * renders edit-show with auto-filled data
  */
  async edit({ params, view }){
    const show = await Show.find(params.id)

    return view.render('edit-show', {
      show: show
    })
  }

  /*
  * Actually updates show in database
  */
  async update ({ response, request, params}){

    const validation = await validate(request.all(), {
      Show_title: 'required',
      Show_date: 'required'
    })
    if(validation.fails()){
      return response.redirect('back')
    }

    const show = await Show.find(params.id)

    show.Show_title = request.all().Show_title
    show.Show_date = request.all().Show_date

    await show.save()
    return response.redirect('/future-shows')
  }

  /*
  * yall can figure this one out im sure
  */
  async delete({ response, params}){
    const show = await Show.find(params.id)

    await show.delete()
    return response.redirect('back')
  }

  /*
  * inserts new ticket into seating_charts table. Only way I could dynamically insert dates
  */
  async insert_ticket({request, response, session}) {
    const SeatingChart = use('App/Models/SeatingChart')

    const validation = await validate(request.all(), {
      Name: 'required',
      Phone_Number: 'required',
      Seat_type: 'required',
      Seats_rsv: 'required'
    })
    if(validation.fails()){
      return response.redirect('back')
    }

    const data = await request.only(['Name', 'Phone_Number', 'Seat_type', 'Seats_rsv'])
    data.Show = date

    const namesQuery = await Show
      .query()
      .select('Name', 'Seats_rsv')
      .from('seating_charts')
      .where('Show', date)
      /*.whereExists(function() {
      this.select('1').from('seating_charts').whereRaw('Show = ?', date).whereRaw('Name = ?', data.Name)
    })*/
      .fetch()

    var names = namesQuery.toJSON()
    console.log(names)
    var flag = false
    for (var i = 0; i < names.length; ++i) {
      var name = names[i]
      if(name.Name == data.Name || name.Seats_rsv == data.Seats_rsv) {
        flag = true
      }
    }

    if(flag) {
      session.flash({ notification: 'Name has already been used OR seat has already been booked' })
      return response.redirect('back')
    }

    await SeatingChart.create(data)
    return response.redirect('back')
  }

  /*
  * displays all uncompleted shows on print-tickets page
  */
  async print_display( {view}) {

    const future = await Show
      .query()
      .select('id', 'Show_title', 'Show_date')
      .from('shows')
      .where('isPast', 0)
      .fetch()

    return view.render('print-tickets', {
      shows: future.toJSON()
    })
  }

  /*
  * displays all tickets to be printed for a given show
  */
  async print_tickets( {view, params}) {
    const show = await Show.find(params.id)

    date = show.Show_date
    showToPrint = await Show.find(params.id)

    console.log(showToPrint)

    const current_show = await Show
      .query()
      .select('*')
      .from('seating_charts')
      .where('Show', '=', show.Show_date)
      .fetch()

    return view.render('print', {
      show: show.toJSON(),
      seating_charts: current_show.toJSON()
    })
  }

  /*
* gets all information to be formatted for a given ticket
*/
  async ticket( {view, params}) {
    const SeatingChart = use('App/Models/SeatingChart')
    const ticket = await SeatingChart.find(params.id)

    const current_show = showToPrint
    console.log(current_show)

    return view.render('print-page', {
      seating_chart: ticket.toJSON(),
      show: current_show.toJSON()
    })
  }
}

module.exports = ShowController
