import React, { Component } from 'react';
import '../styles/Login.css'

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: ''}; 
        // this.handleSubmit = this.handleSubmit.bind(this);
        
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.renderSignUp = this.renderSignUp.bind(this);
        this.renderHomePage = this.renderHomePage.bind(this);

        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(){
        console.warn("handleCheck ok")
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

        fetch('',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:{
                password:password,
                email:email,
            }
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

                            <h3>Login</h3>

                            <section className="form-group">
                                <label>Email : </label>
                                <input onChange={this.onEmailChange} className="form-control" type='email' placeholder='example@email.com' />
                            </section>

                            <section className="form-group">
                                <label>Password : </label>
                                <input onChange={this.onPasswordChange} className="form-control" type='password' placeholder='*****' />
                            </section>

                            <button  onClick={this.handleCheck} className="btn btn-primary btn-block" type='submit'>Sign in</button>

                        </form>
                        

                        <button onClick={this.renderSignUp} style={{marginTop:"10px"}} className="btn btn-primary btn-block" type='submit'>Regestier</button>

                    </section>

                </section>

            </section>
        );
    };
}
 
export default LogIn;