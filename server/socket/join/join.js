const { UserService } = require('../../services/users/userService');
const userService = new UserService();



const join = (socket,io) => {

    socket.on('join', ({ name, room }, callback) => {



        try {
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

}



module.exports = join;