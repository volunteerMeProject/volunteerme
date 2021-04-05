import React, { Component } from 'react';
import {CognitoUserPool} from 'amazon-cognito-identity-js'
import '../../styles/Login.css'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', isAuthenticated: false }; // NOTE: user should always be intended to be
        // de-authenticated when they redirect to login page
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.renderSignUp = this.renderSignUp.bind(this);
        this.renderHomePage = this.renderHomePage.bind(this);

    };

    poolData = {
        UserPoolId:'us-east-1_hlRyJddSG',
        ClientId:'5esvetn1ck838b4iqg4bumd3su'
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const UserPool = new CognitoUserPool(this.poolData)
        var password = this.state.password
        var email = this.state.email

        UserPool.signUp(email,password,[],null,(err,data)=>{
            if (err) console.error(err);
            console.log(data);
        })
    }

    renderSignUp(event){
        this.props.history.push('/signup')
    }

    renderHomePage(event){
        this.props.history.push('/dashboard')
    }

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
                            <button /*onClick={this.renderHomePage}*/ className="btn btn-primary btn-block" type='submit'>Sign Up</button>
                        </form>
                        
                    </section>
                </section>
            </section>
        );
    };
}
 
export default SignUp;