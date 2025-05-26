import { useState } from 'react'
import '../styles/Channel.css'
import { useEffect } from 'react';

function Channel({channel}){
    
    return (
        <div className="channel-container">
            <div className="channel-name"><h2>{channel.name}</h2></div>

        </div>
    )

}

export default Channel