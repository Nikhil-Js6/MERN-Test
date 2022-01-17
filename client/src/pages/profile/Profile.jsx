import axios from 'axios';
import { useEffect, useState } from 'react';
import './profile.scss';

export default function Profile({ token }) {

    const [user, setUser] = useState("");

    useEffect(() => {
        const getUser = async() => {
            const res = await axios.get("http://localhost:3300/api/user",{
                headers: {
                    token: `Bearer ${token}`
                }
            });
            setUser(res.data);
        }
        getUser();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("User");
        setUser(null);
        window.location.replace('/login');
    }

    return (
        <div className='profile'>
            <div className='profileWrapper'>
                <h1>Profile</h1>
                <div className='userInfo'>
                    <div className='userData'>
                        <span>Name: </span>
                        <span>{user.firstname} {user.lastname}</span>
                    </div>
                    <div className='userData'>
                        <span>Email: </span>
                        <span>{user.email}</span>
                    </div>
                    <div className='userData'>
                        <span>Phone: </span>
                        <span>{user.phone}</span>
                    </div>
                    <div className='userData'>
                        <span>Address: </span>
                        <span>{user.address}</span>
                    </div>
                </div>            
            </div>
            <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
    )
}
