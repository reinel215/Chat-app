import React from "react";


import './messageBubble.css';



const MessageBubble = ({ children, user, isCurrentUser }) => {


    return (

        <div className={'BubbleContainer ' + (isCurrentUser ? 'rightSide' : 'leftSide')}>
            <label className="BubbleUsername"> {user} </label>

            <div className={"bubbleTextContainer " + (isCurrentUser ? 'blueColor' : 'greyColor') } >

                {children}

            </div>

        </div>

    );


}




export default MessageBubble;