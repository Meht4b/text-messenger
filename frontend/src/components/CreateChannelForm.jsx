import { useState } from 'react'
import '../styles/CreateChannelForm.css'
import { useEffect } from 'react';
import CloseSquare from '../assets/Close_square.png';

function CreateChannelForm({ setCreatingChannel , fetchChannels, setLoggedIn, editChannel, selectedChannel,setEditChannel }) {
    const [channelName, setChannelName] = useState('');
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');
    const [user3, setUser3] = useState('');
    const [user4, setUser4] = useState('');
    const [error, setError] = useState(0);
    const [changedElements, setChangedElements] = useState(0);


    useEffect(() => {
        setLoggedIn(sessionStorage.getItem("loggedIn") || 0);
        if (changedElements == 0){
        setChannelName(editChannel ? selectedChannel.name : '');
        setUser1(editChannel ? selectedChannel.user1_name : '');
        setUser2(editChannel ? selectedChannel.user2_name : '');
        setUser3(editChannel ? selectedChannel.user3_name : '');
        setUser4(editChannel ? selectedChannel.user4_name : '');
        setChangedElements(1);
        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editChannel?"http://127.0.0.1:5000/update_channel":"http://127.0.0.1:5000/create_channel";
        
        const options = {
            method: editChannel?"PATCH":"POST",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                
                name: channelName,
                channel_id: editChannel ? selectedChannel.id : null,
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
            setChangedElements(0);

        } else {
            console.error("Error creating channel:", data.error);
            if (response.status === 401) {
                console.log("Unauthorized access, please log in again.");
                sessionStorage.removeItem("token");
                sessionStorage.setItem("loggedIn", 0);
                window.location.reload();
                setLoggedIn(0);
                console.log("You are logged out, please log in again.");
            } else if (response.status === 404) {
                setError(1);
                console.error("user not found:", data.error);
            }
        }

    }

    

    return (
        <>  
            <div className='create-channel-form-container'>
                <form className='create-channel-form' onSubmit={handleSubmit}>
                    <button
                        type='button'
                        className='close-button'
                        onClick={() => {
                            setCreatingChannel(false);
                            setEditChannel(0);

                        }}>
                        <img src={CloseSquare} alt="Close" />

                    </button>
                    <h1>{editChannel?"Edit Channel":"Create Channel"}</h1>
                    
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

                    <button className='submit-button'><h2>{editChannel?"Edit":"Create"}</h2></button>
                    
                </form>
            </div>
            {error === 1 && <div className='error-message'>User not found</div>}
        </>
    )

}

export default CreateChannelForm