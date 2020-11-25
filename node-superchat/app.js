const express   = require('express');
const app       = express();
const server    = require('http').createServer(app);
const io        = require('socket.io').listen(server);
const mongoose  = require ('mongoose'); 

// Initiate Mongo Server
const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

const dbmessage = mongoose.model('message',{ name : String, message : String})

// use cors for cross origin
const cors = require('cors');
app.use(cors())

// express
app.use(express.static(__dirname));
app.use(express.json());

server.listen('82', () => {
  	console.log('Server listening on Port 82');
})

///////////////////////////////
//////////* ROUTES  *//////////
///////////////////////////////
const {createUser, logUser, getUser} = require('./routes/user');
app.post('/signup', (req, res) => createUser(req, res));
app.post('/signin', (req, res) => logUser(req, res));
app.get('/getuser/:id', (req, res) => getUser(req, res));


///////////////////////////////
/* TEMPS REEL AVEC SOCKET.IO */
///////////////////////////////
io.on('connection', (socket) => {
	socket.on('newMessage', (newMessage) => {
		const {message, pseudo} = newMessage;
		console.log('nouveau messag de ' + pseudo);
		console.log('nouveau message =  ' + message);
		socket.broadcast.emit('message', newMessage);

		dbmessage.create({name: pseudo, message}, (err, message) => {
			console.log(err)
			console.log(message)
		}) 
	})

	socket.on('newUser', (pseudo) => {
		console.log(`${pseudo} vient de se conecter au serveur.`)

		// save socket pseudo and broadcast incoming
		socket.pseudo = pseudo;
		socket.broadcast.emit('newUser', pseudo);

		// get history and send it to new user
		dbmessage.find({}, (err, docs) => {
			if (err === null && docs.length) {
				console.log('send history to new user')
				socket.emit("history", docs);
			}
		});
	})
});
