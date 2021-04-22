import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';

const Home = () => {

    const [userData, setUserData] = useState({});

    const [show, setShow] = useState(false);

    const history = useHistory();

    const callHomePage = async () => {
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
            setShow(true);
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
        callHomePage();
    }, []);

    return (
        <div>
            <p className="pt-5">Welcome !!</p>
            <h1>{userData.name}</h1>
            <h2>{ show ? 'Happy to see you back' : 'We are the MERN developer' }</h2>
        </div>
    )
}

export default Home
