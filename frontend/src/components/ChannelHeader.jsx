import { useState } from 'react'
import '../styles/ChannelHeader.css'
import { useEffect } from 'react';

function ChannelHeader({ selectedChannel }) {
    

    return (
        <div className='channel-header'>
            <h1>{selectedChannel.name}</h1>
        </div>
    );
}

export default ChannelHeader;