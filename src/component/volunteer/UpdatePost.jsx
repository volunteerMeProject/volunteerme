import React from "react";
import { getVolunteerPost, updatePost } from "../../services/volunteerPostsService"

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      volunteerPost: {
        id: '',
        Title: '',
        Organization: '',
        Description: '',
        Qualifications: '',
        Location: ''
      },
      errors: {}
    }
  }

  async handleSubmit(event) {
    
    event.preventDefault();

    const { status } = await updatePost(this.state.volunteerPost);
    if (status === 200) {
      alert('Post Updated');
      console.log("success");
      this.props.history.push('/');
    }
    if (status !== 200) {
      alert('Post not updated.\nPlease try again later.'); 
      console.log("unsuccess");
    }
    
  }

  handleChange(event) {
    // Set state
    var post = {...this.state.volunteerPost};
    post[event.target.name] = event.target.value;
    this.setState({volunteerPost: post});
  }

  async componentDidMount() {
    // Get posting from db through axiom
    const result = await getVolunteerPost(this.props.match.params.id);
    const post = result.data.Item;
    
    this.setState({volunteerPost: post});
    console.log(this.state.volunteerPost);
    
  }

  render() {
    return (
      <div className="container border rounded p-5 m-5 mx-auto">
        <form onSubmit={this.handleSubmit} className="">
          <div className="row p-2">
            <label className="h3 form-label">
              Organization: 
            </label>
            <input
              className="form-control mt-2" disabled required name="Organization" type="text" defaultValue={this.state.volunteerPost.Organization} onChange={this.handleChange} />
          </div>
          <div className="row p-2">
            <label className="h3 form-label">
              Title:
            </label>
            <input
              className="form-control mt-2" required name="Title" type="text" defaultValue={this.state.volunteerPost.Title} onChange={this.handleChange} />
          </div>
          <div className="row p-2">
            <label className="h3 form-label">
              Description:
            </label>
            <textarea className="form-control mt-2" required rows="4" name="Description" type="text" defaultValue={this.state.volunteerPost.Description} onChange={this.handleChange} />
          </div>
          <div className="row p-2">
            <label className="h3 form-label">
              Qualifications:
            </label>
            <input className="form-control mt-2" required name="Qualifications" type="text" defaultValue={this.state.volunteerPost.Qualifications} onChange={this.handleChange} /> 
          </div>
          <div className="row p-2">
            <label className="h3 form-label">
              Location:
            </label>
            <input className="form-control mt-2" required name="Location" type="text" defaultValue={this.state.volunteerPost.Location} onChange={this.handleChange} />
          </div>
          <div className="row p-2">
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdatePost;
