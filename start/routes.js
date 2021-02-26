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

Route.on('/').render('welcome')

Route.on('/future-shows').render('future-shows')
Route.post('/future-shows', 'SeatingChartController.create')

Route.on('/previous-shows').render('previous-shows')
Route.post('/previous-shows', 'SeatingChartController.create')

Route.on('/add-show').render('add-show')
Route.post('/add-show', 'SeatingChartController.create')

Route.on('/print-tickets').render('print-tickets')
Route.post('/print-tickets', 'SeatingChartController.create')