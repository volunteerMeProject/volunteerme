import React, { Component, useContext } from 'react';
import { getAllVolunteerPosts } from '../../services/volunteerPostsService';
import { deleteVolunteerPost } from '../../services/volunteerPostsService';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Pool from '../volunteer_auth/UserPool';
import {AccountContext} from '../volunteer_auth/Accounts';


class VolunteerTable extends Component {
  state = {
    input: "",
    volunteerPosts: [],
    volunteerPostsDefault: [],
  }

  async handleDelete(e) {
    const id = e.target.value;
    const { status } = await deleteVolunteerPost(id);

    if (status !== 204) alert('Volunteer Post NOT Deleted. \n Please try again later');

    let filteredVolunteerPosts = this.state.volunteerPosts.filter(volunteerPost => volunteerPost.id !== e.target.value);
    console.log(e.target.value);
    console.log(filteredVolunteerPosts);
    this.setState({ filteredVolunteerPosts });
    this.setState({ volunteerPosts: filteredVolunteerPosts });
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

  checkVolunteerSignIn() {
    const user = Pool.getCurrentUser();
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  static contextType = AccountContext;
  logoutUser() {
    var test = this.context;
    test.logout();
    alert('logged out');
    
  }

  render() {
    return (
      <React.Fragment>
        <Link className='btn btn-primary btn-large m-3' to='/createvolunteer'>
          Create Volunteer Post
        </Link>
        <Link className="btn btn-primary btn-large m-3" to='../volunteer_auth/Volunteer_sign_in'>
          Volunteer Sign In
        </Link>
        <SearchBar
          input={this.state.input}
          onChange={this.updateInput.bind(this)}
        />
        {// Put logout button here based on if user is logged in}
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
                <td>

                  <Link className="btn-info btn-sm" to={`/UpdatePost/${volunteerPost.id}`}
                  >
                    Update
                  </Link>
                  <button value={volunteerPost.id} onClick={this.handleDelete.bind(this)} className="btn-info btn-sm"
                  >
                    Delete
                  </button>
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
