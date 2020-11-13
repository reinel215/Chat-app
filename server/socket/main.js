const socket = require('socket.io');

const { UserService } = require('../services/users/userService');
const userService = new UserService();



//EVENTO JOIN
const join = require('./join/join');
//EVENTO SENDMESSAGE
const sendMessage = require('./sendMessage/sendMessage');
//EVENTO DISCONNECT
const disconnect = require('./disconnect/disconnect');








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



        //JOIN EVENT HANDLER
        join(socket,io);


        //SENDMESSAGE EVENT HANDLER
        sendMessage(socket,io);


        //DISCONNECT EVENT HANDLER
        disconnect(socket,io);



    });





}




module.exports = socketConfig;