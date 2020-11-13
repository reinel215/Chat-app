const socket = require('socket.io');

const { UserService } = require('../services/users/userService');
const userService = new UserService();



//EVENTO JOIN
const join = require('./join/join');


const socketConfig = (server) => {

    const io = socket(server, {

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




    //Configuramos los Sockects
    io.on('connection', (socket) => {

        console.log("we have a new connection!!!");



        //EVENTO JOIN
        join(socket);


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





}




module.exports = socketConfig;