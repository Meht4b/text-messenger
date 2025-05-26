import { useState } from 'react'
import '../styles/ChannelList.css'
import { useEffect } from 'react';
import Channel from './Channel'

function ChannelList({channels_list}){

    

    return (
        <div className="channel-list-container">
            {channels_list && channels_list.length > 0 ? (
                channels_list.map((channel, index) => (
                    <Channel key={index} channel={channel} />
                ))
            ) : (
                <div className='no-channels-found'>No channels</div>
            )}
        </div>
    )
}

export default ChannelList