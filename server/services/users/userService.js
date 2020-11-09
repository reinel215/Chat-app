const users = []


class UserService {

    addUser({id,name,room}) {

        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();

        const existingUser = users.find( (user) => user.room === room && user.name === name );

        if (existingUser){
            throw new Error("Username is taken");
        }


        const user = { id,name,room }
        
        users.push(user);

        return user;
    }



    removeUser( id ) {

        const index = users.findIndex( (user) => user.id === id);


        if (index === -1){
            throw new Error("that user doesnt exist");
        }


        return users.splice(index,1)[0];

    }


    getUser( id ) {

        
        return users.find( (user) => user.id === id );

    }


    getUsersInRoom( room ){


        return users.filter( (user) => user.room === room );

    }


}



module.exports = {
    UserService
}