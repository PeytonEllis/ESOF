'use strict'

const show = use('App/Models/Show')

class ShowController {

  async create ({ request, response, view }) {

    const data = await show.create(request.only(['Show_title', 'Show_date']))

    // save and get instance back
    return response.redirect('add-show')
  }

}

module.exports = ShowController
