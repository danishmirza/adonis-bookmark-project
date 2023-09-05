import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import UserFavouriteBook from 'App/Models/UserFavouriteBook'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProfilesController {
    public async dashboard ({ response, auth }: HttpContextContract) {
        return response.created(auth.user)
    }

  public async markFavouriteBook({request, response, auth}: HttpContextContract) {
    const bookId = request.input('book_id', null)
    if(!bookId){
      return response
        .status(400)
        .send({ error: { message: 'Book id is required' } })
    }

    const bookPresent = await UserFavouriteBook.findBy('book_id', bookId)
    if(bookPresent){
      return response
        .status(400)
        .send({ error: { message: 'Book already present in favourites' } })
    }

    return UserFavouriteBook.create({user_id: auth.user.id, book_id: bookId})
      .then(() => {
        return response
          .status(200)
          .send({ message: 'Book added to your favourites list' })
      }).catch(() => {
      return response
        .status(400)
        .send({ message: 'Some problem occurred. Please try again' })
    })

  }

  public async favouritesBooks({request, response, auth}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    return Database.from('user_favourite_books').where({user_id: auth.user.id})
    .paginate(page, limit)
    .then((response) => {
      return response
    }).catch(() => {
      return response
        .status(400)
        .send({ message: 'Some problem occurred. Please try again' })
    })
  }
}
