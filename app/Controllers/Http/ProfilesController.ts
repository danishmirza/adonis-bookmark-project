// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class ProfilesController {
    public async dashboard ({ response, auth }: HttpContextContract) {
        return response.created(auth.user)
    }
}
