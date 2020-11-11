import React from "react";

import ReactScrollToBottom from "react-scroll-to-bottom";

import "./messageBox.css";



const MessageBox = ({ children }) => {


    return (

        <ReactScrollToBottom className="MessageBoxContainer">
            {
                children
            }
        </ReactScrollToBottom>

    )


}




export default MessageBox;