import type {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        const validations = await schema.create({
            email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
            password: schema.string({}, [rules.confirmed()]),
        })
        const data = await request.validate({ schema: validations })
        const user = await User.create(data)
        return response.created(user)
    }

    public async login({ request, response, auth }: HttpContextContract) {
        const password = await request.input('password')
        const email = await request.input('email')

        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '24hours',
            })
            return token.toJSON()
        } catch (error) {
            console.log(error)
            return response
                .status(400)
                .send({ error: { message: 'User with provided credentials could not be found' } })
        }
    }
}
