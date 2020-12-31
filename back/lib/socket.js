const md5 = require('MD5');
const socketManagement = (io) => {

  const userList = {}

  io.sockets.on('connection', (socket) => {

    let userData = false;
    socket.on('login', (userConnected) => {
      // Envoi à l'utilisateur la liste des utilisatur connectés
      for(let user in userList) {
        socket.emit('newUser', userList[user])
      }

      userData = userConnected
      userData.avatar = 'https://gravatar.com/avatar/'+ md5(userData.userName) +'?s=30&d=identicon';
      userData.socketId = socket.id
      userList[socket.id] = userData;
      // Emmettre à tous les autres      
      // socket.broadcast.emit('newUser', user)
      // Emettre à TOUS
      io.sockets.emit('newUser', userData)
      
      socket.emit('connected', socket.id);
    })

    socket.on('disconnect', () => {
      if (!userData) {
        return false;
      }
      delete userList[socket.id];
      io.sockets.emit('userLeft', userData);
    })

    socket.on('logout', () => {
      delete userList[socket.id];
      io.sockets.emit('userLeft', userData);
    })

    socket.on('addMessage', (newMessage) => {
      io.sockets.emit('message', newMessage);
    })

  })
}

module.exports = {
  socketManagement
};
