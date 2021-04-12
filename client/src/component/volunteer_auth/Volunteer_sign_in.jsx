import React, { useState, useContext } from 'react';
import { AccountContext } from '../Accounts';
import '../../styles/Login.css'

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { VolunteerAuthenticate } = useContext(AccountContext);

  const onSubmit = event => {
    event.preventDefault();

    var timer1 = performance.now();
    VolunteerAuthenticate(email, password)
      .then(data => {
        var timer2 = performance.now();
        console.log('Logged in!');
        console.log("Volunteer signing in time: " + (timer2-timer1) + "ms");
        alert("" + email + " is now logged in!");
        //window.location.href = "/";
      })
      .catch(err => {
        alert(err.message);
      })
  };

  return (
    <section className="auth-wrapper">
        <section className="auth-inner">
            <section className="container">
                <form onSubmit={onSubmit} method="POST">
                    <h3>Volunteer login</h3>
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