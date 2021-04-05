import React, { Component } from 'react';
import {CognitoUser, CognitoUserPool, AuthenticationDetails} from 'amazon-cognito-identity-js'
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

        const user = new CognitoUser({
            Username: email,
            Pool:UserPool
        })

        const authDetails = new AuthenticationDetails({
            Username:email,
            Password:password
        });

        user.authenticateUser(authDetails,{
            onSuccess: data=>{
                console.log('onSuceess:',data);
                this.renderHomePage()
            },

            onFailure: err=>{
                console.error('onFailure:',err);
            },

            newPasswordRequired:data=>{
                console.log('newPasswordRequired:',data);
            }
        })
    }

    renderSignUp(event){
        this.props.history.push('/signup')
    }

    renderHomePage(event){
        this.props.history.push('/')
    }

    render() {
        return (
            <section className="auth-wrapper">
                <section className="auth-inner">
                    <section className="container">
                        <form onSubmit={this.handleSubmit} method="POST">
                            <h3>LOGIN</h3>
                            <section className="form-group">
                                <label>Email : </label>
                                <input onChange={this.onEmailChange} className="form-control" type='email' placeholder='example@email.com' />
                            </section>
                            <section className="form-group">
                                <label>Password : </label>
                                <input onChange={this.onPasswordChange} className="form-control" type='password' placeholder='*****' />
                            </section>

                            <button className="btn btn-primary btn-block" type='submit'>LOGIN</button>
                        </form>
                        
                    </section>
                </section>
            </section>
        );
    };
}
 
export default SignUp;