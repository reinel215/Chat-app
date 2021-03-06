const { UserService } = require('../../services/users/userService');
const userService = new UserService();



const handler = (socket,io) =>{

    try {

        const user = userService.removeUser(socket.id);
        io.to(user.room).emit('message', { user: 'admin', text: `user: ${user.name} has left` });
        io.to(user.room).emit('roomData', { room: user.room, users: userService.getUsersInRoom(user.room) });
        console.log("user have left");


    } catch (error) {

        console.log(error.message);

    }

}



const disconnect = (socket,io) => {

    socket.on('out', () => {
    
        handler(socket,io)

    });

    socket.on('disconnect', () => {
        
        handler(socket,io);

    });
}



module.exports = disconnect;