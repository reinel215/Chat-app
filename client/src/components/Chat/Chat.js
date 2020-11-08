import React,{ useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'

let socket;





const Chat = ( {location} ) => {


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    useEffect( () => {
        const {name , room} = queryString.parse(location.search);

        socket = io('http://localhost:3001/');

        setName(name);
        setRoom(room);


        socket.emit('join' , { name , room });

        console.log(socket);
    }, [location.search])

    return(

        <h1>CHAT</h1>

    )

}


export default Chat;