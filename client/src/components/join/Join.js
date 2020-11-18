import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import useRedirect from "../../hooks/useRedirect";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


import './join.css'




const theme = createMuiTheme({

    palette: {
        secondary: {
            main: "#ffffff"
        }
    }

});




const Join = (props) => {

    const [setFlag,redirect, setName, setRoom , name , room] = useRedirect();

    const inputName = useRef(null)



    useEffect( () => {
        inputName.current.focus();
    } ,[])



    return (

        

        <div className="joinOuterContainer">
            
            {
                redirect(name,room)
            }

            <div className="joinInnerContainer" onKeyPress={event => event.key === 'Enter' ? setFlag(true) : null} >
                <h1 className="heading"> JOIN TO A ROOM </h1>

                <ThemeProvider theme={theme}>

                    <form className="form-join" noValidate autoComplete="off">
                        <TextField inputRef={inputName} className="join-input" id="name" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
                        <TextField className="join-input" id="room" label="Room" variant="outlined" onChange={(event) => setRoom(event.target.value)} />
                    </form>

                    <Link className="link-join" onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <Button color="secondary" variant="outlined" size="large" >Sign In</Button>
                    </Link>

                </ThemeProvider>

            </div>

        </div>

    )

}


export default Join;