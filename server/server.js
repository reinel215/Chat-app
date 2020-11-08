const express = require('express');
const socketIo = require('socket.io');
const http = require('http');


const port = process.env.PORT || 3001;


const app = express();
const server = http.createServer(app);
const io = socketIo(server);




//CONFIGURAMOS LAS RUTAS
const { chatApi } = require('./routes/chat/chat');
chatApi(app);



//Configuramos los Sockects
io.on('connection', ( socket )=> {

    console.log("we have a new connection!!!");


    socket.on('disconnect', ()=> {

        console.log("user have left");

    });

} );




server.listen(port, ()=> console.log("server has started on port "+ port));