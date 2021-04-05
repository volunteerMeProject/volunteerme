import React, {useState, useContext} from 'react';
import {AccountContext} from './Accounts';
import CognitoUserPool from '../../UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Link } from 'react-router-dom';
import {BrowserRouter as Route} from 'react-router-dom';
import Status from './Status';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {authenticate} = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();
        
        authenticate(email, password)
            .then(data => {
                console.log('logged in', data);
                
            })
            .catch(err => {
                console.error('failed to log in', err);
            })
    }
    
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="container border rounded p-5 m-5 mx-auto">
            <Status/>
            <form onSubmit={event => onSubmit(event)} className="">
                <legend className="h1 row p-2" style={{color:"green"}}>Volunteer Login</legend>
                <div className="row p-2">
                <label className="h3 form-label" style={{color:"green"}}>
                    Email: 
                </label>
                <input
                    className="form-control mt-2" required name="Email" type="text" onChange={event => onChangeEmail(event)} value={email} />
                </div>
                <div className="row p-2">
                <label className="h3 form-label" style={{color:"green"}}>
                    Password:
                </label>
                <input
                    className="form-control mt-2" required name="Password" type="password" onChange={event => onChangePassword(event)} value={password} />
                </div>
                <div className="row p-2">
                <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <Link to={{pathname:"/"}}>Back </Link>
        </div>
    );
}