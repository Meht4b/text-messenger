import { useState } from 'react'
import '../styles/ChannelHeader.css'
import { useEffect } from 'react';
import EditIcon from '../assets/edit.png';
import Arrow from '../assets/arrow-left.png';
function ChannelHeader({ selectedChannel,setEditChannel,setCreatingChannel,setSelectedChannel }) {
    
    useEffect(() => {
        console.log(selectedChannel);
    }, []);

    return (
        <div className='channel-header'>
            <div className='header-left'>
            <button className='back-btn'
            onClick={() => setSelectedChannel(null)}>
                <img src={Arrow} alt="" />
            </button>
            <div >
                <h1>{selectedChannel.name}</h1>

                <div className='header-left-users'>
                    {selectedChannel.user1_name && <span> {selectedChannel.user1_name} </span>}
                    {selectedChannel.user2_name && <span>, {selectedChannel.user2_name} </span>}
                    {selectedChannel.user3_name && <span>, {selectedChannel.user3_name} </span>}
                    {selectedChannel.user4_name && <span>, {selectedChannel.user4_name} </span>}
                </div>
                </div>
            </div>
            <button className='edit-btn' onClick={() => {
                setEditChannel(1);
                setCreatingChannel(1);
            }}><img src={EditIcon}></img></button>
        </div>
    );
}

export default ChannelHeader;