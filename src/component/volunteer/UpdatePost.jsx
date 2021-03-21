import React from "react";

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      postID: "",
      organization: "",
      title: "",
      description: "",
      qualifications: "",
      eventAddress: ""
    };
  }

  handleSubmit(event) {
    // Validate

    // Send to back-end

    event.preventDefault();
  }

  handleChange(event) {
    // Set state
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    // Get posting from db through axiom
  }

  render() {
    return (
      <div className="container border rounded p-5 m-5 mx-auto">
        <form onSubmit={this.handleSubmit} className="">
          <div className="row pl-2">
            <label className="fw-light text-muted">
              Post #{this.props.postID}
            </label>
          </div>
          <div className="row p-2">
            <label className="h3 form-label">
              Title:
            </label>
            <input
              className="form-control mt-2" name="title" type="text" value={this.props.title} onChange={this.handleChange} />
          </div>
          <div className="row p-2">
            <label className="h3 form-label">
              Description:
            </label>
            <textarea className="form-control mt-2" rows="4" name="description" type="text" value={this.props.description} />
          </div>
          <div className="row p-2">
            <label className="h3 form-label">
              Qualifications:
            </label>
            <input className="form-control mt-2" name="qualification" type="text" value={this.props.qualifications} /> 
          </div>
          <div className="row p-2">
            <label className="h3 form-label">
              Location:
            </label>
            <input className="form-control mt-2" name="eventAddress" type="text" value={this.props.eventAddress} />
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
