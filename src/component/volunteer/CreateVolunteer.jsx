import React, { Component } from 'react';
import '../../styles/volunteerForm.css';
import uuid from 'react-uuid';
import Joi from "joi-browser";
import { postVolunteerPost } from '../../services/volunteerPostsService';

class CreateVolunteer extends Component {
  state = {
    volunteerPost: {
      Title: '',
      Organization: '',
      Description: '',
      Qualifications: '',
      Location: ''
    },
    errors: {}
  }

  schema = {
    Title: Joi.string().required(),
    Organization: Joi.string().required(),
    Description: Joi.string().required(),
    Qualifications: Joi.string().required(),
    Location: Joi.string().required()
  }

  validateForm = () => {
    const { error } = Joi.validate(this.state.volunteerPost, this.schema, { abortEarly: false});

    if (!error) return {};

    const errors = {};

    for (let err of error.details) {
      errors[err.path[0]] = err.message; 
    }

    return errors;
  }


  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors });

    if (Object.keys(errors).length !== 0) return;

    const params = {...this.state.volunteerPost};
    params.id = uuid();

    const { status } = await postVolunteerPost(params);
    
    if (status === 201)
    {
      alert('Volunteer Post Saved');
      this.props.history.push('/');
    }
    if (status !== 201) alert('Volunteer Post NOT Saved. \n Please try again later');
  }

  handleChange = e => {
    const volunteerPost = {...this.state.volunteerPost};
    volunteerPost[e.currentTarget.name] = e.currentTarget.value;
    const errors = this.validateForm();
    this.setState({ volunteerPost, errors });
  }

  renderInputClass (keyName) {
    let classes = 'inputField';
    if (keyName === 'Description' || keyName === 'Qualifications') {
      classes = 'largeInputField';
    }
    return classes
  }

  renderMaxLength (keyName) {
    let maxStringLength = '255';
    if (keyName === 'Description' || keyName === 'Qualifications') {
      maxStringLength = '1250';
    }
    return maxStringLength;
  }

  renderError (keyName) {
    if (this.state.errors[keyName]) {
      return <p className='formError'>{this.state.errors[keyName]}</p>;
    }
  }
  
  render() { 
    const volunteerPost = this.state.volunteerPost;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className='volunteerForm'>
          <h1>Create Volunteer</h1>
            {Object.keys(volunteerPost).map((keyName, i) => (
            <div key={i} className='inputDiv'>
                <label>{keyName}</label>
                {this.renderError(keyName)}
                <textarea
                  className={this.renderInputClass(keyName)}
                  name={keyName}
                  type='text'
                  value={volunteerPost[keyName]}
                  onChange={this.handleChange}
                  maxLength={this.renderMaxLength(keyName)}
                >
                </textarea>
            </div>
            ))}
          <button className="btn btn-dark volunteerSubmitButton">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
 
export default CreateVolunteer;