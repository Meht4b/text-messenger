import { useState } from 'react'
import '../styles/login.css'
import { useEffect } from 'react';


function Login({propLogin, propError,setLoggedIn}) {

    

    const [Login, setLogin] = useState(propLogin);
    const [Error, setError] = useState(propError);
    const [userCreated, setUserCreated] = useState(0);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    

    const handleSubmit = async (event) => {

        event.preventDefault();
        const user = { name, password };

        if (Login == 0) {
            const url = "http://127.0.0.1:5000/create_user";
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            };

            const response = await fetch(url, options);
            if (response.ok) {
                setName("");
                setPassword("");
                setLogin(1);
                setError(0);
                setUserCreated(1);
            } else {
                console.log(response.json().error)
                setError(1);
            }
        }

        if (Login == 1) {
            const url = "http://127.0.0.1:5000/check_password"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            };

            

            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                sessionStorage.setItem("token", data.access_token);
                setLoggedIn(1);
            } else {
                setError(1);
                setName("");
                setPassword("");
                console.log(data.error)
            }
        }

    }

    useEffect(() => {
        if (userCreated === 1) {
            const timer = setTimeout(() => {
                setUserCreated(0);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [userCreated]);

    return (
        <form className="login-container" onSubmit={handleSubmit}>
            {Login ? <h1>Login</h1> : <h1>Register</h1>}
            <div className="input-group">
                <label htmlFor="username"><h3>User Name :</h3></label>
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password"><h3>Password :</h3></label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>


            {Login ?
                <button type="submit" className='login-submit'><h2>Login</h2></button>:
                <button type="submit" className='login-submit'><h2>Register </h2></button>
            }

                        {Login == 1 && (
                <button type='button' className='register-link' onClick={() => 
                    {setLogin(0)
                    setError(0)}}>
                    <h3>New? Register here</h3>
                </button>
            )}

            {Error == 1 && Login == 1 && (
                <div className='login-error'><h3>Password or username is incorrect</h3></div>
            )}

            {Error == 1 && Login == 0 && (
                <div className='login-error'><h3>Username already exists</h3></div>
            )}

            {
                userCreated == 1 && (
                    <div className='register-success'><h3>User created successfully! You can now login.</h3></div>
                )
            }

        </form>
    )
}

export default Login
