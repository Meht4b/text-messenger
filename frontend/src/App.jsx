import { useState } from 'react'

import './styles/App.css'
import Login from './components/Login'

function App() {

  const [loggedIn, setLoggedIn] = useState(0)

  const [error, setError] = useState(0)


  return (
    <>
      {loggedIn === 0 && <Login propLogin={1} setLoggedIn={setLoggedIn}/>}
      
    </>
  )
}

export default App
