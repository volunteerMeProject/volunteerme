import React, { Component } from 'react';
import { getAllVolunteerPosts } from '../../services/volunteerPostsService';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

class VolunteerTable extends Component {
  state = {
    input: "",
    volunteerPosts: [],
    volunteerPostsDefault: [],
  }

  
  async componentDidMount() {
    const res = await getAllVolunteerPosts();
    const volunteerPostsDefault = res.data.body;
    volunteerPostsDefault.sort((a, b) => (a.Time > b.Time) ? 1 : -1);

    this.setState({ volunteerPostsDefault });
    this.setState({ volunteerPosts: volunteerPostsDefault})
  }

  async updateInput(input) {
    const filtered = this.state.volunteerPostsDefault.filter(posting => {
      return posting.Title.toLowerCase().includes(input.toLowerCase())
    })
    this.setState({ input });
    this.setState({volunteerPosts: filtered});
  }
  
  render() {
    return (
      <React.Fragment>
        <Link className='btn btn-primary btn-large m-3' to='/createvolunteer'>
          Create Volunteer
        </Link>
        <SearchBar
          input={this.state.input}
          onChange={this.updateInput.bind(this)}
        />
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