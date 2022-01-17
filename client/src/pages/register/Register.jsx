import { useRef } from 'react';
import axios from 'axios';
import "./register.scss";

export default function Register() {

    const fNameRef = useRef();
    const lNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            firstname: fNameRef.current.value,
            lastname: lNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value
        }
        try {
            const res = await axios.post("http://localhost:3300/api/register", newUser);
            res.status === 200 && window.location.replace("/login");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='register'>
            <div className='formWrapper'>
                <h1>Register</h1>
                <form className='registerForm' onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder='Firstname' ref={fNameRef}/>
                    <input type="text" placeholder='Lastname' ref={lNameRef}/>
                    <input type="email" placeholder='Email' ref={emailRef}/>
                    <input type="password" placeholder='password' ref={passwordRef}/>
                    <input type="number" placeholder='Phone' ref={phoneRef}/>
                    <input type="text" placeholder='Address' ref={addressRef}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}
