import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client'
import ReactEmoji from 'react-emoji';

import "./Chat.css";



import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

import MessageBox from "../MessageBox/MessageBox";


import MessageBubble from "../MessageBubble/MessageBubble";


let socket;





const Chat = ({ location }) => {


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setmessage] = useState('');
    const [messages, setmessages] = useState([]);


    useEffect(() => {
        console.log("pase por el efecto");
        const { name, room } = queryString.parse(location.search);

        socket = io('http://localhost:4000/');

        setName(name);
        setRoom(room);


        socket.emit('join', { name, room }, () => { });



        return () => {
            socket.emit('out');
            socket.off();
        }


    }, [location.search])



    useEffect(() => {
        socket.on('message', message => {
            setmessages(messages => [...messages, message]);
        });
    }, [])




    const sendMessage = async (event) => {

        event.preventDefault();

        if (message) {

            await socket.emit('sendMessage', message, () => setmessage(''));

        }

    }


    return (

        <div className="outerContainer">

            <div className="container">

                <AppBar position="static">
                    <Toolbar className="chatToolbar">





                        <h3 className="room-name"> {room} </h3>

                        <Link to="/" className="Link">
                            <IconButton className="ChatExitIcon" edge="end" color="inherit" aria-label="menu">
                                <ExitToAppIcon />
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>




                <MessageBox>

                    {
                        messages.map((message, i) => {
                            return (
                                <MessageBubble
                                    key={i}
                                    user={message.user}
                                    isCurrentUser={message.user === name}
                                >
                                    { ReactEmoji.emojify(message.text)}
                                </MessageBubble>
                            )
                        })
                    }


                </MessageBox>




                <div className="chatSendMessageContainer" >


                    <input placeholder="Send a message" type="text" value={message} onChange={event => { setmessage(event.target.value) }}
                        className="inputMessage"
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />


                    <Fab className="sendButton" color="primary" aria-label="sned">
                        <SendIcon />
                    </Fab>


                </div>



            </div>

        </div>

    )

}


export default Chat;