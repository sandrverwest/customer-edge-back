require('dotenv').config();

const express = require('express');
const http = require('http');

const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const socketRooms = require('./ws/socket-rooms');

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

const router = require('./routes'); //imports index.js from routes folder



// app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/', express.static('files'));
app.use(router);

socketRooms(io, app); /// web socket rooms


const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;
  
mongoose
    .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`))

server.listen(PORT, (err) => {
  err ? console.log(err) : console.log('Server is Running... Port', PORT);
});