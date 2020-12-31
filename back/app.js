const express = require('express');
const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io').listen(server);
require('dotenv').config();

// use cors for cross origin
const cors = require('cors');
app.use(cors());

// express
app.use(express.static(__dirname));
app.use(express.json());

const PORT = process.env.PORT || 82;
server.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));

// Initiate Mongo Server
const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

///////////////////////////////
//////////* ROUTES  *//////////
///////////////////////////////

//// USER ////
const {createUser, logUser, getUser} = require('./routes/user');
app.post('/signup', (req, res) => createUser(req, res));
app.post('/signin', (req, res) => logUser(req, res));
app.get('/getuser/:id', (req, res) => getUser(req, res));

//// MESSAGE ////
const { getHistory, addMessage } = require('./routes/messages')
app.get('/history', (req, res) => getHistory(req,res));
app.post('/message', (req, res) => addMessage(req,res));

///////////////////////////////
/* TEMPS REEL AVEC SOCKET.IO */
///////////////////////////////
const { socketManagement } = require('./lib/socket');
socketManagement(io);

