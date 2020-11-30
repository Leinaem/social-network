const socketManagement = (io) => {
  console.log('manage')

  io.on('connection', (socket) => {
    

    socket.on('newUser', (pseudo) => {
      console.log(pseudo)
      console.log(socket.id)
    })


  })
}

module.exports = {
  socketManagement
};
