import React, { Component } from 'react';
import Joi from 'joi-browser';
import '../../styles/volunteerSIgnUp.css';
import { CognitoUserPool } from 'amazon-cognito-identity-js';


class VolunteerSignUp extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {}
  }

  poolData = {
    UserPoolId: 'us-east-1_QySj6OP4L',
    ClientId: '75i2r6h3adjoes6ksueqomkqd3'
  }

  UserPool = new CognitoUserPool(this.poolData);

  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }

  validate = () => {
    const result = Joi.validate(this.state.user, this.schema, { abortEarly: false });

    if (!result.error) return null;
    const errors = {};
    
    for(let item of result.error.details){
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleChange = e => {
    const user = {...this.state.user}
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ user});
  }

  handleSubmit = e => {
    e.preventDefault();
    
    const errors = this.validate();
    this.setState({ errors: errors || {}});
    if (errors) return;

    const { email, password } = this.state.user;

    this.UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        const errors = {...this.state.errors};
        errors.message = err.message;
        this.setState({ errors });
      }else {
        this.props.history.push('/');
      }
    });
  }

  renderError (keyName) {
    if (this.state.errors[keyName]) return <p className='volunteerFormSignUpError'>{this.state.errors[keyName]}</p>
  }

  render() { 
    const { user } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className='volunteerSignUpForm'>
          <h1 style={{color: "green"}}>Volunteer Sign Up</h1>
          {Object.keys(user).map((keyName, i) => (
            <div key={i} className='volunteerSignUpDiv'>
              <label>{keyName}</label>
              {this.renderError(keyName)}
              <input
                className='volunteerSignUpInput'
                name={keyName}
                type='text'
                onChange={this.handleChange}
              />
            </div>
          ))}
          {this.renderError('message')}
          <button className="btn btn-info volunteerSubmitButton">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
 
export default VolunteerSignUp;