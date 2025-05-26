import { useState } from 'react'
import '../styles/CreateChannelForm.css'
import { useEffect } from 'react';
import CloseSquare from '../assets/Close_square.png';

function CreateChannelForm({ setCreatingChannel , fetchChannels, setLoggedIn }) {
    const [channelName, setChannelName] = useState('');
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');
    const [user3, setUser3] = useState('');
    const [user4, setUser4] = useState('');
    useEffect(() => {
        setLoggedIn(sessionStorage.getItem("loggedIn") || 0);
        
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://127.0.0.1:5000/create_channel";
        const options = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: channelName,
                user0: user1,
                user1: user2,
                user2: user3,
                user3: user4
            }),
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            setChannelName('');
            setUser1('');
            setUser2('');
            setUser3('');
            setUser4('');
            setCreatingChannel(false);
            fetchChannels(); 

        } else {
            console.error("Error creating channel:", data.error);
            if (response.status === 401) {
                console.log("Unauthorized access, please log in again.");
                sessionStorage.removeItem("token");
                sessionStorage.setItem("loggedIn", 0);
                window.location.reload();
                setLoggedIn(0);
                console.log("You are logged out, please log in again.");
            }
        }

    }

    return (
        <div className='create-channel-form-container'>
            <form className='create-channel-form' onSubmit={handleSubmit}>
                <button
                    type='button'
                    className='close-button'
                    onClick={() => setCreatingChannel(false)}>
                    <img src={CloseSquare} alt="Close" />

                </button>
                <h1>Create Channel</h1>
                
                <label htmlFor='channel-name'>Channel Name:</label>
                <input
                    type='text'
                    id='channel-name'
                    name='channel-name'
                    required
                    value={channelName}
                    placeholder='enter channel name'
                    onChange={e => setChannelName(e.target.value)}
                />
                
                <label htmlFor='channel-user-1'>user 1:</label>
                <input
                    type='text'
                    id='channel-user-1'
                    name='channel-user-1'
                    required
                    placeholder='enter your username'
                    value={user1}
                    onChange={e => setUser1(e.target.value)}
                />
                <label htmlFor='channel-user-2'>user 2:</label>
                <input
                    type='text'
                    id='channel-user-2'
                    name='channel-user-2'
                    placeholder='leave empty if no user'
                    value={user2}
                    onChange={e => setUser2(e.target.value)}
                />
                <label htmlFor='channel-user-3'>user 3:</label>
                <input
                    type='text'
                    id='channel-user-3'
                    name='channel-user-3'
                    placeholder='leave empty if no user'
                    value={user3}
                    onChange={e => setUser3(e.target.value)}
                />
                <label htmlFor='channel-user-4'>user 4:</label>
                <input
                    type='text'
                    id='channel-user-4'
                    name='channel-user-4'
                    placeholder='leave empty if no user'
                    value={user4}
                    onChange={e => setUser4(e.target.value)}
                />

                <button className='submit-button'><h2>Create</h2></button>
                
            </form>
        </div>
    )

}

export default CreateChannelForm