import React from "react";


import './messageBubble.css';



const MessageBubble = ({children,user}) => {



    return(

        <div className="BubbleContainer left-side">
            <label className="BubbleUsername"> {user} </label>
            {children}
        </div>

    );


}




export default MessageBubble;