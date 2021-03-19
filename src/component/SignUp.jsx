import React, { Component } from 'react';
import '../styles/Login.css'

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
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        var password = this.state.password
        var email = this.state.email
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
                            <button onClick={this.renderHomePage} className="btn btn-primary btn-block" type='submit'>Sign Up</button>
                        </form>
                        
                    </section>
                </section>
            </section>
        );
    };
}
 
export default SignUp;