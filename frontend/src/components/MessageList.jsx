import { useState, useRef } from 'react'
import '../styles/Messagelist.css'
import Message from './Message';
import { useEffect } from 'react';

function MessageList({ selectedChannel,setLoggedIn }) {
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
            const url = "https://text-messenger.onrender.com/get_messages/" + String(selectedChannel.id) + "/0";
            const options = {
                method: "GET",
                headers: {
                    'Authorization': "Bearer " + sessionStorage.getItem("token"),
                    'Content-Type': 'application/json',
                }
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                if (response.status == 401 || response.status == 403) {
                    setLoggedIn(0);
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("username");
                    sessionStorage.setItem("loggedIn", 0);
                
                }
                throw new Error(`HTTP error! status: ${response.status}`);

            }
            const data = await response.json();
            setMessages(data.messages || []);

        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    }

    useEffect(() => {
        if (selectedChannel) {
            fetchMessages();
        }
    }, [selectedChannel]);

    const messageListRef = useRef(null);

    const prevMessagesRef = useRef([]);

    useEffect(() => {
        const prevMessages = prevMessagesRef.current;
        // Only scroll if the content of messages changes (not just a new reference)
        const contentChanged = 
            messages.length !== prevMessages.length ||
            messages.some((msg, i) => 
                prevMessages[i]?.message !== msg.message ||
                prevMessages[i]?.user_name !== msg.user_name ||
                prevMessages[i]?.timestamp !== msg.timestamp
            );
        if (contentChanged && messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
        prevMessagesRef.current = messages;
    }, [messages]);

    return (
        <div className='message-list' ref={messageListRef}>
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