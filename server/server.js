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





const { UserService } = require('./services/users/userService');
const userService = new UserService();


//Configuramos los Sockects
io.on('connection', (socket) => {

    console.log("we have a new connection!!!");



    socket.on('join', ({ name, room }, callback) => {

        try {

            console.log();

            let user = userService.addUser({ id: socket.id, name, room });
            socket.join(user.room);
            socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room:${user.room}` });
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has join` });

            io.to(user.room).emit('roomData', { room: user.room, users: userService.getUsersInRoom(user.room) });


            callback();

        } catch (err) {

            console.error("hubo un error en 'join' agregando a un usario");
            console.error(err);
            callback(err.message);
        }

        console.log(`the name is: ${name} and the room is: ${room}`);
    });


    socket.on('sendMessage', (message, callback) => {


        const user = userService.getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();

    });


    socket.on('disconnect', () => {
        try {

            const user = userService.removeUser(socket.id);
            io.to(user.room).emit('message', { user: 'admin', text: `user: ${user.name} has left` });
            io.to(user.room).emit('roomData', { room: user.room, users: userService.getUsersInRoom(user.room) });
            console.log("user have left");


        } catch (error) {

            console.log(error);

        }

    });

});




server.listen(port, () => console.log("server has started on port " + port));