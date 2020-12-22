const express  = require('express');
const app      = express();
const server   = require('http').createServer(app);
const io       = require('socket.io').listen(server);
const mongoose = require ('mongoose');

// Initiate Mongo Server
const InitiateMongoServer = require("./config/db");
InitiateMongoServer();


// use cors for cross origin
const cors = require('cors');
app.use(cors());

// express
app.use(express.static(__dirname));
app.use(express.json());

server.listen('82', () => console.log('Server listening on Port 82'));

///////////////////////////////
//////////* ROUTES  *//////////
///////////////////////////////

//// USER ////
const {createUser, logUser, getUser} = require('./routes/user');
app.post('/signup', (req, res) => createUser(req, res));
app.post('/signin', (req, res) => logUser(req, res));
app.get('/getuser/:id', (req, res) => getUser(req, res));

//// MESSAGE ////
const { getHistory } = require('./routes/messages')
app.get('/history', (req, res) => getHistory(req,res))

///////////////////////////////
/* TEMPS REEL AVEC SOCKET.IO */
///////////////////////////////
const { socketManagement } = require('./lib/socket');
socketManagement(io);



// @todo refacto on feature/refactoSocketIo
// io.on('connection', (socket) => {
// 	socket.on('newMessage', (newMessage) => {
// 		const {message, pseudo} = newMessage;
// 		console.log('nouveau messag de ' + pseudo);
// 		console.log('nouveau message =  ' + message);
// 		socket.broadcast.emit('message', newMessage);

// 	})

