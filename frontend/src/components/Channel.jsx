import { useState } from 'react'
import '../styles/Channel.css'
import { useEffect } from 'react';

function Channel({channel, setSelectedChannel}) {
    
    return (
        <div className="channel-container"
         onClick={() => 
            setSelectedChannel(channel)

         }>
            <div className="channel-name"><h2>{channel.name}</h2></div>

        </div>
    )

}

export default Channel