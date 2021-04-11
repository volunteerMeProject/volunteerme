import React, { Component, useContext } from 'react';
import { getAllVolunteerPosts } from '../../services/volunteerPostsService';
import { deleteVolunteerPost } from '../../services/volunteerPostsService';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import VolunteerPool from '../volunteer_auth/UserPool';
import AdminPool from '../admin_auth/UserPool';
import {AccountContext} from '../Accounts';


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
    const user = VolunteerPool.getCurrentUser();
    console.log(user);
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  handleSignUp(e) {
    const postID = e.target.value;
    var row = document.getElementById(postID);
    var button = document.getElementById("Button:" + postID);
    if (button.innerText === "Signed Up!") {
      button.innerText = "Sign Up";
      row.style.backgroundColor = null;
    } else {
      button.innerText = "Signed Up!";
      row.style.backgroundColor = "blue";

    }
  }

  checkAdminSignIn() {
    const user = AdminPool.getCurrentUser();
    console.log(user);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  static contextType = AccountContext;
  logoutUser(e) {
    var test = this.context;
    test.logout();
    alert('Logged out');
    window.location.reload();
    
  }

  render() {
    return (
      <React.Fragment>
        {(this.checkVolunteerSignIn() || this.checkAdminSignIn()) && 
          <Link className="btn btn-primary btn-large m-3" to="../profile/profile">Profile</Link>
        }
        {this.checkAdminSignIn() && 
          <Link className='btn btn-primary btn-large m-3' to='/createpost'>
            Create Volunteer Post
          </Link>
        }
        {(!this.checkAdminSignIn() && !this.checkVolunteerSignIn()) && 
          <React.Fragment>
            <Link className="btn btn-primary btn-large m-3" to='../admin_auth/admin_sign_up'>
              Admin Sign Up
            </Link>
            <Link className="btn btn-primary btn-large m-3" to='../admin_auth/admin_signin'>
              Admin Sign In
            </Link>
            <Link className="btn btn-primary btn-large m-3" to='../volunteer_auth/volunteer_sign_up'>
              Volunteer Sign Up
            </Link>
            <Link className="btn btn-primary btn-large m-3" to='../volunteer_auth/Volunteer_sign_in'>
              Volunteer Sign In
            </Link>
          </React.Fragment>
        }
        <SearchBar
          input={this.state.input}
          onChange={this.updateInput.bind(this)}
        />
        {(this.checkVolunteerSignIn() || this.checkAdminSignIn()) && 
          <button className="btn btn-primary btn-large m-3" onClick={this.logoutUser.bind(this)}>
            Logout
          </button>
        }
        {/* {Put logout button here based on if user is logged in} */}
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
              <tr key={volunteerPost.id} id={volunteerPost.id}>
                <td>{volunteerPost.Title}</td>
                <td>{volunteerPost.Organization}</td>
                <td>{volunteerPost.Description}</td>
                <td>{volunteerPost.Qualifications}</td>
                <td>{volunteerPost.Location}</td>
                <td>
                {(this.checkAdminSignIn() && !this.checkVolunteerSignIn()) && 
                  <div>
                    <Link className="btn-info btn-sm m-3" to={`/UpdatePost/${volunteerPost.id}`}
                    >
                      Update
                    </Link>
                    <button value={volunteerPost.id} onClick={this.handleDelete.bind(this)} className="btn-info btn-sm m-3"
                    >
                      Delete
                    </button>
                  </div>
                }
                {this.checkVolunteerSignIn() && 
                <button value={volunteerPost.id} id={"Button:" + volunteerPost.id} onClick={this.handleSignUp.bind(this)} className="btn-info btn-sm m-3" >
                  Sign Up
                </button>
                }
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
