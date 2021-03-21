import React, { Component } from 'react';
import '../../styles/volunteerForm.css';
import uuid from 'react-uuid'
import { postVolunteerPost } from '../../services/volunteerPostsService';

class CreateVolunteer extends Component {
  state = {
    volunteerPost: {
      Title: '',
      Organization: '',
      Description: '',
      Qualifications: '',
      Location: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const params = {...this.state.volunteerPost};
    params.id = uuid();

    const status = await postVolunteerPost(params);

    
    console.log(status);
  }

  handleChange = e => {
    const volunteerPost = {...this.state.volunteerPost};
    volunteerPost[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ volunteerPost });
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
  
  render() { 
    const volunteerPost = this.state.volunteerPost;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className='volunteerForm'>
          <h1>Create Volunteer</h1>
            {Object.keys(volunteerPost).map((keyName, i) => (
            <div key={i} className='inputDiv'>
                <label>{keyName}</label>
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