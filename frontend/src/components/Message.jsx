import { useState } from 'react'
import '../styles/Message.css'
import { useEffect } from 'react';

function Message({ message, user, time,serverMsg }) {
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("user");
        setIsCurrentUser(loggedInUser === user);
    }, [user]);

    return (
        <> {serverMsg == true ?
            <div className='server-message'>
                {message}
            </div>
            :
            <div className={`message ${isCurrentUser ? 'current-user' : 'other-user'}`}>
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