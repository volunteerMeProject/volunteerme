import React, { Component, useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { postVolunteerPost } from '../services/volunteerPostsService';

const poolData = {
    UserPoolId: 'us-east-1_ygiGsE5BW',
    ClientId: '4n957elr8vtbpcc02o5qh47vsh'
}

const UserPool = new CognitoUserPool(poolData);

class AdminSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', isAuthenticated: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        UserPool.signUp(this.state.email, this.state.password, [], null, (err, data) => {
            if (err) console.error(err);
            console.log(data);
        });

        this.props.history.push('/signin')
    };

    render() {
        return (
            <section className="auth-wrapper">
                <section className="auth-inner">
                    <section className="container">
                        <form onSubmit={this.handleSubmit} method="POST">
                            <h3>Sign Up</h3>
                            <section className="form-group">
                                <label>Email : </label>
                                <input onChange={this.onEmailChange} className="form-control" type='email' placeholder='example@email.com' />
                            </section>
                            <section className="form-group">
                                <label>Password : </label>
                                <input onChange={this.onPasswordChange} className="form-control" type='password' placeholder='*****' />
                            </section>
                            <section className="form-group">
                                <label>Double ConfirmPassword : </label>
                                <input onChange={this.onPasswordChange} className="form-control" type='password' placeholder='*****' />
                            </section>
                            <button onClick={this.renderHomePage} className="btn btn-primary btn-block" type='submit'>Sign Up</button>
                        </form>
                    </section>
                </section>
            </section>
        )
    }
}

export default AdminSignUp;