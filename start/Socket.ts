import User from 'App/Models/User'
import Ws from 'App/Services/Ws'
Ws.boot()
/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {
  const user = await User.all();
  socket.emit('news', { user: user })

})
