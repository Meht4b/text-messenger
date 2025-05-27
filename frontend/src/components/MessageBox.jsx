import { useState } from 'react'
import '../styles/MessageBox.css'
import { useEffect } from 'react';
import submitIcon from '../assets/arrow-circle-right.png'

function MessageBox({currentChannel}) {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const msg = message;
        setMessage('');
        const url = (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/send_message" ;
        const options = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            channel_id: currentChannel.id,
            message: msg
        })
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
            console.log("Message sent successfully");

        } else {
            console.error("Error sending message:", data);
        }
        console.log(currentChannel);
        console.log(data);

        
    };


    return (
        <form className='message-box' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="message-input"
            />
            <button type="submit" className="send-button">
                <img src={submitIcon} alt="Send" className="send-icon" />
            </button>
        </form>
    );
}

export default MessageBox;