import { useState } from 'react'

import './styles/App.css'
import Login from './components/Login'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)


  return (
      <div>
        <h1>Welcome to the App</h1>
        <Login />
      </div>
  )
}

export default App
