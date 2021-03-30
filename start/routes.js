'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Render each view
Route.on('/').render('welcome')
Route.on('/add-show').render('add-show')

Route.get('/future-shows', 'ShowController.index')
Route.get('/print-tickets', 'ShowController.print_display')
Route.get('/print-tickets/:id', 'ShowController.print_tickets')
    //Route.get('/print-tickets/print/:id', 'SeatingChartController.ticket')
Route.on('/print-tickets/print/:id').render('print-page')
Route.get('/previous-shows', 'ShowController.pastIndex')
Route.get('/future-shows/delete/:id', 'ShowController.delete')
Route.get('/future-shows/edit-show/:id', 'ShowController.edit')
Route.get('/add-ticket/edit-ticket/:id', 'SeatingChartController.edit')
Route.get('/add-ticket/delete/:id', 'SeatingChartController.delete')
Route.get('/future-shows/:id', 'ShowController.details')

Route.post('/future-shows/update/:id', 'ShowController.update')
Route.post('/add-ticket/update/:id', 'SeatingChartController.update')
Route.post('/add-show', 'ShowController.create')
Route.post('/future-shows', 'ShowController.insert_ticket')
Route.post('/future-Shows/isPast/:id', 'ShowController.isPast')