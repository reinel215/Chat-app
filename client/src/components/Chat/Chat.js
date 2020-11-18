import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactEmoji from 'react-emoji';



//import css
import "./Chat.css";


//import materials components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';



//imports other Componets
import MessageBox from "../MessageBox/MessageBox";
import MessageBubble from "../MessageBubble/MessageBubble";




//import hooks
import useSocket from "../../hooks/useSocket";





const Chat = ({ location }) => {


    const [message, setmessage] = useState('');

    const [{ name, room, messages }, sendMessage] = useSocket('localhost:4000',location.search);

    const inputMessage = useRef(null);



    useEffect( () =>{

        inputMessage.current.focus();

    },[]);



    const handleSend = async (event) => {

        event.preventDefault();

        sendMessage(message);

        setmessage('');

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
                        onKeyPress={event => event.key === 'Enter' ? handleSend(event) : null}
                        ref={inputMessage}
                    />


                    <Fab className="sendButton" color="primary" aria-label="sned"
                        onClick={event => message ? handleSend(event) : null}
                    >
                        <SendIcon />
                    </Fab>


                </div>



            </div>

        </div>

    )

}


export default Chat;