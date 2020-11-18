import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client'
//import useQueryString from "./useQueryString";
import queryString from 'query-string';




const useSocket = (url,location) => {


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setmessages] = useState([]);
    const socket = useRef(null);


    useEffect( () => {
        console.log("ejecute el efecto");
        const {name , room} = queryString.parse(location);
        socket.current = io(url);

        setName(name);
        setRoom(room);

        
        socket.current.emit('join', { name, room }, () => { });


        socket.current.on('message', message => {
            setmessages(messages => [...messages, message]);
        });



        return () => {
            socket.current.emit('out');
            socket.current.off();
        }


    }, [location,url] );




    const sendMessage = (message) => {

        if (message) {

            socket.current.emit('sendMessage', message,()=>{} );

        }
    }




    return  [{ name, room, messages }, sendMessage] ;

}




export default useSocket;