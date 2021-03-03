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
Route.on('/previous-shows').render('previous-shows')
Route.on('/add-show').render('add-show')
Route.on('/print-tickets').render('print-tickets')
Route.get('/future-shows', 'ShowController.index')

Route.post('/future-shows', 'SeatingChartController.create')
Route.post('/add-shows', 'ShowController.create')
// Potential view and controller function to display the database
//Route.get('/database_display', 'SeatingChartController.display')
