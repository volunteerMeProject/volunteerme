import React, { Component, useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { admin_user_pool_id, admin_client_id } from '../../config';

const poolData = {
    UserPoolId: admin_user_pool_id,
    ClientId: admin_client_id
};

const UserPool = new CognitoUserPool(poolData);

class AdminSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', confirmPassword: '', isAuthenticated: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onConfirmPasswordChange(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.password === this.state.confirmPassword) {
            UserPool.signUp(this.state.email, this.state.password, [], null, (err, data) => {
                if (err) {
                    alert(err.message);
                } else {
                    this.props.history.push('/signin')
                }
            });
        } else {
            alert("Passwords do not match");
        }
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
                                <label>Confirm Password : </label>
                                <input onChange={this.onConfirmPasswordChange} className="form-control" type='password' placeholder='*****' />
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