import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../App';

const Login = () => {

    const {state, dispatch} = useContext(UserContext);

    const [loginFields, setLoginFields] = useState({
        email: '',
        password: ''
    });

    const history = useHistory();

    const loginFieldsHandler = (event) => {
        const {id, value} = event.target;
        setLoginFields({...loginFields, [id]: value});
    }

    const loginSubmitHandler = async () => {
        let result = await fetch('/login', {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(loginFields)
        });
        const data = await result.json();
        if(result.status === 400 || !data){
            window.alert('Invalid credentials');
            console.log('Invalid credentials');
        } else {
            dispatch({type:"USER", payload:true});
            window.alert('Login successfull');
            console.log('Login successfull');
            history.push('/');
        }
    }

    return (
        <div className="col-sm-6 offset-sm-3">
                <h1>User Login</h1>
                <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={loginFields.email}
                    placeholder="Enter Email"
                    onChange={loginFieldsHandler} />
                <br />
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={loginFields.password}
                    placeholder="Enter Password"
                    onChange={loginFieldsHandler} />
                <br />
                <button type="button" onClick={loginSubmitHandler} className="btn btn-primary">Login</button>
            </div>
    )
}

export default Login
