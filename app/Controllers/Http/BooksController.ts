import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cache from '@ioc:Kaperskyguru/Adonis-Cache'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

export default class BooksController {
  public async index({request, response}: HttpContextContract) {
    const keyword = request.input('keyword', null)
    // keyword is required
    if(!keyword){
      return response
        .status(400)
        .send({ error: { message: 'Keyword is required' } })
    }
    // page number default is 1
    const page = request.input('page', 1)
    // max results default is 10
    const maxResults = 5
    // start of the record cursor default is 0
    const startIndex = (parseInt(page)-1) * maxResults

    return  await Cache.remember(`books-${keyword}-${page}`, 30, async function() {
      return await axios.get(`${Env.get('BOOKS_API_URL')}?key=${Env.get('BOOKS_API_KEY')}&q=${keyword}&startIndex=${startIndex}&maxResults=${maxResults}`).then(response => response.data)
    })
  }
}
