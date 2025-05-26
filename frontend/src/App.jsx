import { useState } from 'react'

import './styles/App.css'
import Login from './components/Login'
import ChannelList from './components/ChannelList'
import { useEffect } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(0)

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("loggedIn") || 0);
    
  });

  useEffect(() => {
    fetchChannels();
  }, []);

  const [error, setError] = useState(0)

  const [channelsList, setChannelsList] = useState([])

  const fetchChannels = async () => {
    const url = "http://127.0.0.1:5000/get_channels";
    const options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
        }
        
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        console.log(data);
        setChannelsList(data.channels);
    } else {

        console.log(data.error)
    }
  }

  return (

    <>
      {loggedIn === 0 ?
        <Login propLogin={1} setLoggedIn={setLoggedIn} callBack={fetchChannels}/>:
        <ChannelList channels_list={channelsList}/>
        }
      
    </>

    
  )
}

export default App
