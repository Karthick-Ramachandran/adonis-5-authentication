import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckAuth {
  public async handle ({auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try{
      await auth.use('web').authenticate()
      await next()
    } catch(e){
      response.unauthorized({ error: 'Must be logged in' })
      return
    }


  }
}
