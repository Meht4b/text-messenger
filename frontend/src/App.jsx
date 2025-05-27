import { use, useRef, useState } from 'react'

import './styles/App.css'
import Login from './components/Login'
import ChannelList from './components/ChannelList'
import CreateChannelForm from './components/CreateChannelForm'
import MessageList from './components/MessageList'
import MessageBox from './components/MessageBox'
import ChannelHeader from './components/ChannelHeader'
import { useEffect } from 'react';

import SearchIcon from './assets/search-normal.png'


function App() {

  const [loggedIn, setLoggedIn] = useState(0)
  const [channelsList, setChannelsList] = useState([])
  const [creatingChannel, setCreatingChannel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedChannelName, setSelectedChannelName] = useState("");
  const [messages, setMessages] = useState([]);
  const [editChannel, setEditChannel] = useState(0);

  const lastReadRef = useRef(0)

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("loggedIn") || 0);
    if (sessionStorage.getItem("token") == null || sessionStorage.getItem("token") === "null") {
      sessionStorage.setItem("loggedIn", 0);
      setLoggedIn(0);
    }
    
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChannels();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [searchQuery]);

  
  const fetchChannels = async () => {
    if (sessionStorage.getItem("token") == null || sessionStorage.getItem("token") == "" ) {
      return;
    }
    const searchq = searchQuery ? searchQuery : "NULLNULL";
    const url = "https://text-messenger.onrender.com/get_channels/" + searchq;
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

  const getLastRead = () => {LastRead}
  

  if (window.innerWidth < 600) {
    return (
        <>
      {loggedIn === 0 ?
        <Login propLogin={1} setLoggedIn={setLoggedIn} callBack={fetchChannels}/>
        :
        <div className='body-container'>
          {selectedChannel ?
          <div className='body-right'>
                { 
                  selectedChannel &&
                  <ChannelHeader 
                  selectedChannel={selectedChannel}
                  setEditChannel={setEditChannel}
                  setCreatingChannel={setCreatingChannel}
                  setSelectedChannel={setSelectedChannel}
                  />
                }
                <MessageList selectedChannel={selectedChannel}
                 setLoggedIn={setLoggedIn} 
                 lastReadRef={lastReadRef}
                />
                { 
                selectedChannel &&
                  <MessageBox currentChannel={selectedChannel} />
                }
          </div> 
          :
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

              <ChannelList 
              channels_list={channelsList} 
              setSelectedChannel={setSelectedChannel} setSelectedChannelName = {setSelectedChannelName} 
              lastReadRef={lastReadRef}
              />
            </div>
            
            <button className='create-channel-button' onClick={() => setCreatingChannel(true)}>
              <h2>Create Channel</h2>
            </button>
          </div>
          }


        {
          creatingChannel &&
          <CreateChannelForm 
          setCreatingChannel = {setCreatingChannel}
          fetchChannels={fetchChannels}
          setLoggedIn={setLoggedIn}
          selectedChannel={selectedChannel}
          editChannel={editChannel}
          setEditChannel={setEditChannel}
            />
        }
        
        </div>
        }
      
    </>
    )
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

              <ChannelList channels_list={channelsList}
              setSelectedChannel={setSelectedChannel} setSelectedChannelName = {setSelectedChannelName}
              lastReadRef={lastReadRef}/>
            </div>
            
            <button className='create-channel-button' onClick={() => setCreatingChannel(true)}>
              <h2>Create Channel</h2>
            </button>
          </div>
          <div className='body-right'>
                { 
                  selectedChannel &&
                  <ChannelHeader 
                  selectedChannel={selectedChannel}
                  setEditChannel={setEditChannel}
                  setCreatingChannel={setCreatingChannel}
                  />
                }
                <MessageList selectedChannel={selectedChannel} setLoggedIn={setLoggedIn} 
                lastReadRef={lastReadRef}
                />
                { 
                selectedChannel &&
                  <MessageBox currentChannel={selectedChannel} />
                }
          </div>
        {
          creatingChannel &&
          <CreateChannelForm 
          setCreatingChannel = {setCreatingChannel}
          fetchChannels={fetchChannels}
          setLoggedIn={setLoggedIn}
          selectedChannel={selectedChannel}
          editChannel={editChannel}
          setEditChannel={setEditChannel}
            />
        }
        
        </div>
        }
      
    </>

    
  )
}

export default App
