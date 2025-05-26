import { useState } from 'react'
import '../styles/Messagelist.css'
import Message from './Message';
import { useEffect } from 'react';

function MessageList({ selectedChannel }) {
//[message, user, time]
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!selectedChannel) return;
        const interval = setInterval(() => {
            fetchMessages();
        }, 100);
        return () => clearInterval(interval);
    }, [selectedChannel]);
    
    const fetchMessages = async () => {
        try {
            const url = "http://127.0.0.1:5000/get_messages/" + String(selectedChannel) + "/0";
            const options = {
                method: "GET",
                headers: {
                    'Authorization': "Bearer " + sessionStorage.getItem("token"),
                    'Content-Type': 'application/json',
                }
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMessages(data.messages || []);
            console.log("Fetched messages:", data.messages);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    }

    useEffect(() => {
        if (selectedChannel) {
            fetchMessages();
        }
    }, [selectedChannel]);

    return (
        <div className='message-list'>
            {selectedChannel ? (
                messages.map((msg, index) => (
                    <Message
                        key={index}
                        message={msg.message}
                        user={msg.user_name}
                        time={typeof msg.timestamp === 'string' ? msg.timestamp.slice(-8,-3) : ''}
                        serverMsg={msg.server_msg }
                    />
                ))
            ) : (
                <div className='no-channel-selected'>Select a channel to view messages</div>
            )}
        </div>
    )

}

export default MessageList;