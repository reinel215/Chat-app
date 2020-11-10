import React from "react";


import "./messageBox.css";



const MessageBox = ({children}) => {


    return(

        <div className="MessageBoxContainer">

            {
                children
            }

        </div>

    )


}




export default MessageBox;