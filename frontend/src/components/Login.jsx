import { useState } from 'react'
import '../styles/login.css'



function Login() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contact = { name, password };

        const url = "blahblahbalh";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        };

        const response = await fetch(url, options);
        if (response.ok) {
            setName("");
            setEmail("");
        } else {
            alert("Error creating contact:", response.json().messsage);
        }

    }

    return (
        <div className="login-container" onSubmitCapture={handleSubmit}>
            <h1>Login</h1>
            <form onSubmit={submit}>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input 
                type="text" 
                id="username"
                name="username"
                required 
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input 
                type="password"
                id="password"
                name="password"
                required 
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            </form>
            
        </div>
  )
}

export default Login
