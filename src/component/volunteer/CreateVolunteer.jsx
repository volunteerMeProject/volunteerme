import React, { Component } from 'react';
import '../../styles/volunteerForm.css';
import { getAllVolunteerPosts } from '../../services/volunteerPostsService';

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

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.volunteerPost);
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
  
  render() { 
    const volunteerPost = this.state.volunteerPost;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className='volunteerForm'>
          <h1>Create Volunteer</h1>
            {Object.keys(volunteerPost).map((keyName, i) => (
            <div key={i} className='inputDiv'>
                <label>{keyName}</label>
                {/* <input
                  className={this.renderInputClass(keyName)}
                  name={keyName}
                  type='text'
                  value={volunteerPost[keyName]}
                  onChange={this.handleChange}
                /> */}
                <textarea
                  className={this.renderInputClass(keyName)}
                  name={keyName}
                  type='text'
                  value={volunteerPost[keyName]}
                  onChange={this.handleChange}
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