import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";


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

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [keyFlag, setKeyFlag] = useState(false);


    useEffect( () => {
        setKeyFlag(false);
    }, [name,room] );


    const goTo = () => {

        if((name && room))
        return <Redirect to={`/chat?name=${name}&room=${room}`}/>

    }


    return (

        

        <div className="joinOuterContainer">
            
            {
                keyFlag ? goTo() : null
            }

            <div className="joinInnerContainer" onKeyPress={event => event.key === 'Enter' ? setKeyFlag(true) : setKeyFlag(false)} >
                <h1 className="heading"> JOIN TO A ROOM </h1>

                <ThemeProvider theme={theme}>

                    <form className="form-join" noValidate autoComplete="off">
                        <TextField className="join-input" id="name" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
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