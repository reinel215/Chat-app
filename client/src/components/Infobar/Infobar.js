import React from "react";

import closeIcon from "../../icons/closeIcon.png";
import onLineIcon from "../../icons/onlineIcon.png";


const Infobar = ( {room} ) =>{

    return(

        <div className="InfoBar">

            <div className="LeftInnerContainer">

                <img src={onLineIcon} alt="perfil" className="onLineIcon" />
                <h3> {room} </h3>

            </div>

            <div className="RightInnerContainer">

                <a href="/"> <img src={closeIcon} alt="cerrar"/> </a>

            </div>

        </div>

    )

}



export default Infobar;