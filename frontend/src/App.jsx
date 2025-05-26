import { useState } from 'react'

import './styles/App.css'
import Login from './components/Login'
import { useEffect } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(0)

  const [error, setError] = useState(0)


  useEffect(() => {
    if (loggedIn === 1) {
      const fetchDashboard = async () => {
        const token = sessionStorage.getItem("token");

        const response = await fetch("http://127.0.0.1:5000/dashboard", {
          method: "GET",
          headers: {
            "Authorization": String("Bearer " + token),
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
      };

      fetchDashboard();
    }
  }, [loggedIn]);


  return (
    <>
      {loggedIn === 0 && <Login propLogin={1} setLoggedIn={setLoggedIn}/>}
      
    </>
  )
}

export default App
