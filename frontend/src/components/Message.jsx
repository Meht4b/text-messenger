import { useState } from 'react'
import '../styles/Message.css'
import { useEffect } from 'react';

function Message({ message, user, time,serverMsg,isUser }) {

    return (
        <> {serverMsg == true ?
            <div className='server-message'>
                {message}
            </div>
            :
            <div className={`message ${isUser ? 'current-user' : 'other-user'}`}>
                <div className="message-header">
                    <span className="message-user">{user}</span>
                    <span className="message-time">{time}</span>
                </div>
                <div className="message-content">
                    {message}
                </div>
            </div>
            }   
        </>
    );
}

export default Message;