import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class VolunteerTable extends Component {
  state = {
    volunteerPosts: [],
  }
  
  async componentDidMount() {
    const volunteerPosts = [
      {
        id: 1,
        Title: "First Volunteer",
        Description: "This is the description for the volunteer post",
        Qualifications: "Must be a genius",
        Location: "Vancouver"
      },
      {
        id: 2,
        Title: "Second Volunteer",
        Description: "This is the description for the volunteer post second",
        Qualifications: "Must be a genius second",
        Location: "Vancouver second"
      },
      {
        id: 3,
        Title: "Third Volunteer",
        Description: "This is the description for the volunteer post third",
        Qualifications: "Must be a genius third",
        Location: "Vancouver third"
      }
    ]

    this.setState({ volunteerPosts});
  }
  
  render() {
    return (
      <React.Fragment>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Qualifications</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.volunteerPosts.map(volunteerPost => (
              <tr key={volunteerPost.id}>
                <td>{volunteerPost.Title}</td>
                <td>{volunteerPost.Description}</td>
                <td>{volunteerPost.Qualifications}</td>
                <td>{volunteerPost.Location}</td>
                <td>
                  <Link className="btn-info btn-sm" to={`/UpdatePost/`} 
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
 
export default VolunteerTable;