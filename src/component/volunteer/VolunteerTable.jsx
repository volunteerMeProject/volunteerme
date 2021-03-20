import React, { Component } from 'react';
import { getAllVolunteerPosts } from '../../services/volunteerPostsService';
import { Link } from 'react-router-dom';

class VolunteerTable extends Component {
  state = {
    volunteerPosts: [],
  }
  
  async componentDidMount() {
    const res = await getAllVolunteerPosts();
    const volunteerPosts = res.data.body;

    this.setState({ volunteerPosts });
  }
  
  render() {
    return (
      <React.Fragment>
        <Link className='btn btn-primary btn-large m-3' to='/createvolunteer'>
          Create Volunteer
        </Link>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Organization</th>
              <th>Description</th>
              <th>Qualifications</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.volunteerPosts.map(volunteerPost => (
              <tr key={volunteerPost.id}>
                <td>{volunteerPost.Title}</td>
                <td>{volunteerPost.Organization}</td>
                <td>{volunteerPost.Description}</td>
                <td>{volunteerPost.Qualifications}</td>
                <td>{volunteerPost.Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
 
export default VolunteerTable;