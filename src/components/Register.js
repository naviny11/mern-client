import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {

    const [signUpFields, setSignUpfields] = useState({
        name: '', email: '', phone: '', work: '', password: '', cpassword: '' 
    });

    const history = useHistory();

    const signUpFieldsHandler = (event) => {
        //console.log(event.target);
        const { id, value } = event.target;
        setSignUpfields({...signUpFields,[id]: value});
        //console.log(signUpFields);
    }

    const signUpSubmitHandler = async () => {

        //console.log(signUpFields);
        let result = await fetch('/register', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpFields)
        }
        )
        const data = await result.json();
        if(result.status === 422 || !data){
            window.alert('Invalid Registration');
            console.log('Invalid Registration');
        } else {
            window.alert('Successfull Registration');
            console.log('Successfull Registration');
            history.push('/login');
        }
    }

    return (
        <div className="col-sm-6 offset-sm-3">
                <h1>User Sign Up</h1>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    autoComplete="off"
                    value={signUpFields.name}
                    placeholder="Enter Name"
                    onChange={signUpFieldsHandler} />
                <br />
                <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={signUpFields.email}
                    placeholder="Enter Email"
                    onChange={signUpFieldsHandler} />
                <br />
                <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={signUpFields.phone}
                    placeholder="Enter Phone"
                    onChange={signUpFieldsHandler} />
                <br />
                <input
                    type="text"
                    className="form-control"
                    name="work"
                    id="work"
                    autoComplete="off"
                    value={signUpFields.work}
                    placeholder="Enter Work"
                    onChange={signUpFieldsHandler} />
                <br />
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={signUpFields.password}
                    placeholder="Enter Password"
                    onChange={signUpFieldsHandler} />
                <br />
                <input
                    type="password"
                    className="form-control"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={signUpFields.cpassword}
                    placeholder="Enter Confirm Password"
                    onChange={signUpFieldsHandler} />
                <br />
                <button type="button" onClick={signUpSubmitHandler} className="btn btn-primary">Register</button>
            </div>
    )
}

export default Register
