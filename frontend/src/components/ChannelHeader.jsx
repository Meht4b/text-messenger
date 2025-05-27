import { useState } from 'react'
import '../styles/ChannelHeader.css'
import { useEffect } from 'react';
import EditIcon from '../assets/edit.png';
function ChannelHeader({ selectedChannel,setEditChannel,setCreatingChannel }) {
    
    useEffect(() => {
        console.log(selectedChannel);
    }, []);

    return (
        <div className='channel-header'>
            <div className='header-left'>
                <h1>{selectedChannel.name}</h1>

                <div className='header-left-users'>
                    {selectedChannel.user1_name && <span> {selectedChannel.user1_name} </span>}
                    {selectedChannel.user2_name && <span>, {selectedChannel.user2_name} </span>}
                    {selectedChannel.user3_name && <span>, {selectedChannel.user3_name} </span>}
                    {selectedChannel.user4_name && <span>, {selectedChannel.user4_name} </span>}
                </div>
            </div>
            <button onClick={() => {
                setEditChannel(1);
                setCreatingChannel(1);
            }}><img src={EditIcon}></img></button>
        </div>
    );
}

export default ChannelHeader;