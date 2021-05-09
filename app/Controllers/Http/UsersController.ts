import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class UsersController {
  public async create ({request, response}: HttpContextContract) {

   const newUserSchema = schema.create({
    name: schema.string({},[
      rules.minLength(3)
    ]),
    email: schema.string({}, [
        rules.unique({ table: 'users', column: 'email' }),
       rules.email({
      sanitize: true,
      ignoreMaxLength: true,

    })
    ]),
    password: schema.string({},[
      rules.minLength(6),
    ])
  })

    const payload = await request.validate({
      schema: newUserSchema,
      messages: {
        'name.required': 'name is required'
      }
    })

   const newUser =  await new User();
   newUser.name = payload.name;
   newUser.email = payload.email;
   newUser.password = payload.password;

   await newUser.save();
   return response.json(newUser);


  }

  public async login ({request, auth, response}: HttpContextContract) {

    const loginSchema = schema.create({

      email: schema.string({}, [
         rules.email({
        sanitize: true,
        ignoreMaxLength: true,
      })
      ]),
      password: schema.string({},[
        rules.required(),
      ])
    })

      const payload = await request.validate({
        schema: loginSchema,
        messages: {
          'name.required': 'name is required'
        }
      })
    const email = payload.email;
    const password = payload.password;
  await auth.use('web').attempt(email, password)

  return response.redirect('/home');
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
