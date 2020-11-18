import { useState , useEffect} from "react";
import { Redirect } from 'react-router-dom';


const useRedirect = () => {

    const [flag,setFlag] = useState(false);


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    useEffect( () => {
        setFlag(false);
    }, [name,room] );


    const redirect = () => {

        if (name && room)
        return flag ? <Redirect to={`/chat?name=${name}&room=${room}`}  /> : null

    }



    return [setFlag, redirect, setName, setRoom, name , room]



}


export default useRedirect;