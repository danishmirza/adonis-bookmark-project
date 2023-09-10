/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(() => {
  Route.get('books', 'BooksController.index')

  Route.group(() => {
    // registration logic
    Route.post('register', 'AuthController.register').as('register')
    Route.post('login', 'AuthController.login').as('login')
  }).prefix('auth/')

  Route.group(() => {
    Route.get('', 'ProfilesController.dashboard')

    Route.resource('bookmarks', 'BookmarksController')
        .only(['index', 'store', 'destroy'])
  }).prefix('profile/').middleware('auth:api')

}).prefix('api/v1/')
