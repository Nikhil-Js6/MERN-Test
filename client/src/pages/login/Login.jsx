import { useRef } from 'react';
import axios from 'axios';
import "./login.scss";

export default function Login({ setToken }) {

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            const res = await axios.post("http://localhost:3300/api/login", newUser);
            localStorage.setItem("User", res.data);
            setToken(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='login'>
            <div className='formWrapper'>
                <h1>Login</h1>
                <form className='registerForm' onSubmit={(e) => handleSubmit(e)}>
                    <input type="email" placeholder='Email' ref={emailRef}/>
                    <input type="password" placeholder='password' ref={passwordRef}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}