import React, { useState, useContext } from 'react';
import { AccountContext } from '../Accounts';
import '../../styles/Login.css'

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { AdminAuthenticate } = useContext(AccountContext);

  const onSubmit = event => {
    event.preventDefault();

    AdminAuthenticate(email, password)
      .then(data => {
        alert("The admin: " + email + " is now logged in!");
        window.location.href = "/"
      })
      .catch(err => {
        console.error('Failed to login!', err);
      })
  };

  return (
    <section className="auth-wrapper">
        <section className="auth-inner">
            <section className="container">
                <form onSubmit={onSubmit} method="POST">
                    <h3>Admin Login</h3>
                    <section className="form-group">
                        <label>Email : </label>
                        <input onChange={event => setEmail(event.target.value)} className="form-control" type='email' placeholder='example@email.com' />
                    </section>
                    <section className="form-group">
                        <label>Password : </label>
                        <input onChange={event => setPassword(event.target.value)} className="form-control" type='password' placeholder='*****' />
                    </section>

                    <button className="btn btn-primary btn-block" type='submit'>LOGIN</button>
                </form>
                
            </section>
        </section>
    </section>
  );
};