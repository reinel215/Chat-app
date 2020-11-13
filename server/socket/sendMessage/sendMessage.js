const { UserService } = require('../../services/users/userService');
const userService = new UserService();



const sendMessage = (socket,io) => {

    socket.on('sendMessage', (message, callback) => {

        const user = userService.getUser(socket.id);


        console.log(`user:${user.name} ha enviado un mensaje a ${user.room}`);
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();

    });

}



module.exports = sendMessage;