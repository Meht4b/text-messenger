import { useState } from 'react'

import './styles/App.css'
import Login from './components/Login'
import ChannelList from './components/ChannelList'
import CreateChannelForm from './components/CreateChannelForm'
import Message from './components/Message'

import { useEffect } from 'react';

import SearchIcon from './assets/search-normal.png'


function App() {

  const [loggedIn, setLoggedIn] = useState(0)
  const [channelsList, setChannelsList] = useState([])
  const [creatingChannel, setCreatingChannel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("loggedIn") || 0);
    if (sessionStorage.getItem("token") == null || sessionStorage.getItem("token") === "null") {
      sessionStorage.setItem("loggedIn", 0);
      setLoggedIn(0);
    }
    
  });

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [searchQuery]);

  const fetchChannels = async () => {
    const searchq = searchQuery ? searchQuery : "NULLNULL";
    const url = "http://127.0.0.1:5000/get_channels/" + searchq;
    const options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
        },

        
        
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        console.log(data);
        setChannelsList(data.channels);
    } else {
        setLoggedIn(0)
        
        if (response.status == 401){
            console.log("Unauthorized access, please log in again.");
            sessionStorage.removeItem("token");
            sessionStorage.setItem("loggedIn", 0);
            setLoggedIn(0);
        }
    }
  }

  return (

    <>
      {loggedIn === 0 ?
        <Login propLogin={1} setLoggedIn={setLoggedIn} callBack={fetchChannels}/>
        :
        <div className='body-container'>
          <div className='body-left'>
            <div className='body-left-top-header'>
              <div className='header-title'>
                <h1>Channels</h1>
              </div>
                <div className='search-container'>
                  <input 
                  type="text" placeholder='Search Channels' 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);

                  }
                }
                  />
                  <button className='search-button'><img src={SearchIcon} alt="" /></button>
                </div>
              </div>
            
            <div className='body-left-top'>

              <ChannelList channels_list={channelsList}/>
            </div>
            
            <button className='create-channel-button' onClick={() => setCreatingChannel(true)}>
              <h2>Create Channel</h2>
            </button>
          </div>
          <div className='body-right'>
                {/* Simulate a long conversation */}
                <Message message={"Hello, how are you?"} user={"a"} time={"12:00 PM"}/>
                <Message message={"I'm good, thanks! How about you?"} user={"user2"} time={"12:01 PM"}/>
                <Message message={"Doing well. Working on the project."} user={"a"} time={"12:02 PM"}/>
                <Message message={"That's great! Need any help?"} user={"user2"} time={"12:03 PM"}/>
                <Message message={"Maybe later. I'll let you know."} user={"a"} time={"12:04 PM"}/>
                <Message message={"Alright, just ping me."} user={"user2"} time={"12:05 PM"}/>
                <Message message={"Will do. By the way, did you see the new update?"} user={"a"} time={"12:06 PM"}/>
                <Message message={"Yes, looks awesome!"} user={"user2"} time={"12:07 PM"}/>
                <Message message={"Glad you like it."} user={"a"} time={"12:08 PM"}/>
                <Message message={"Let's catch up later."} user={"user2"} time={"12:09 PM"}/>
                <Message message={"Sure, talk soon!"} user={"a"} time={"12:10 PM"}/>
                {/* Add more messages as needed to simulate a longer conversation */}
          </div>
        {
          creatingChannel &&
          <CreateChannelForm 
          setCreatingChannel = {setCreatingChannel}
          fetchChannels={fetchChannels}
          setLoggedIn={setLoggedIn}
            />
        }
        
        </div>
        }
      
    </>

    
  )
}

export default App
