import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import sessionConfig from 'Config/session'

export default class CheckUnAuth {
  public async handle ({auth, response, session}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try{
      await auth.use('web').authenticate()
      return response.redirect('/home');
    } catch(e){
      await next()
    }
  }
}
