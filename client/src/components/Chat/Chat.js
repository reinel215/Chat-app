import React,{ useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'


import Infobar from "../Infobar/Infobar";

let socket;





const Chat = ( {location} ) => {


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setmessage] = useState('');
    const [messages, setmessages] = useState([]);


    useEffect( () => {
        const {name , room} = queryString.parse(location.search);

        socket = io('http://localhost:3001/');

        setName(name);
        setRoom(room);


        socket.emit('join' , { name , room }, () => {});


        return () => {
            //socket.emit('disconnect');
            socket.off();
        }


    }, [location.search])


    useEffect( () => {

        socket.on('message', (message) => {

            setmessages([...messages,message]);

        });

    } , [messages]);



    const sendMessage = (event) => {

        event.preventDefault();

        if(message){

            socket.emit('sendMessage', message , () => setmessage('') );

        }

    }

    console.log(messages);

    return(

        <div className="outerContainer">

            <div className="container">

                <Infobar room={ room } />

                <input type="text" value={message} onChange={ event => { setmessage(event.target.value) } } 
                
                onKeyPress={ event =>  event.key==='Enter' ? sendMessage(event) : null  }
                />

                
            </div>

        </div>

    )

}


export default Chat;