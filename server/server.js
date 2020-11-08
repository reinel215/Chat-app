const express = require('express');
const http = require('http');


const port = process.env.PORT || 3001;


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {

    cors: {
        // The `*` is used as the wildcard here.
        origin: "*",
        // Set the other options according to your needs.
        // The docs are here:
        // https://www.npmjs.com/package/cors#configuration-options
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"]
    }
    

});



const morgan = require('morgan');
app.use(morgan('dev'));



const cors = require('cors');
app.use(cors());




//CONFIGURAMOS LAS RUTAS
const { chatApi } = require('./routes/chat/chat');
chatApi(app);



//Configuramos los Sockects
io.on('connection', (socket) => {

    console.log("we have a new connection!!!");



    socket.on('join', ( {name , room} ) => {

        console.log(`the name is: ${name} and the room is: ${room}`);

    });


    socket.on('disconnect', () => {

        console.log("user have left");

    });

});




server.listen(port, () => console.log("server has started on port " + port));