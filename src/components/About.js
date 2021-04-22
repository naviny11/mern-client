import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';

const About = () => {
    
    const history = useHistory();

    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            //console.log(data);
            setUserData(data);
            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <div>
            <p>Welcome to About page</p>
            <h1>We are the MERN developer</h1>
            <p>{userData.name}</p>
            <p>{userData.email}</p>
            <p>{userData.phone}</p>
            <p>{userData.work}</p>
        </div>
    )
}

export default About
