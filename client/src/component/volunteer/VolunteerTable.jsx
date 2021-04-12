import React, { Component, useContext } from 'react';
import { getAllVolunteerPosts, updateVolunteerPost, deleteVolunteerPost } from '../../services/volunteerPostsService';
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
    email: ""
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

  static contextType = AccountContext;
  setEmail() {
    var user_session = this.context
    user_session.getSession().then(session => {
      this.setState({
        email: session.idToken.payload.email
      });
    });
  }

  componentDidMount() {
    
    var timer1 = performance.now();
    
    getAllVolunteerPosts().then((res) => {
      var timer2 = performance.now();

      const volunteerPostsDefault = res.data.body;
      volunteerPostsDefault.sort((a, b) => (a.Time > b.Time) ? 1 : -1);

      this.setEmail();
      this.setState({ volunteerPostsDefault });
      this.setState({ volunteerPosts: volunteerPostsDefault})
      
      console.log("Get posts time: ", (timer2-timer1));
    })
    
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
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  handleSignUp(e) {
    const user = VolunteerPool.getCurrentUser();
    const username = user.username;
    let volunteerPost = this.state.volunteerPosts.filter(volunteerPost => volunteerPost.id == e.target.value)[0];
    console.log(volunteerPost);
    if (volunteerPost.volunteerIds) {
      volunteerPost.volunteerIds = [...volunteerPost.volunteerIds, username];
    } else {
      volunteerPost.volunteerIds = [username];
    }
    updateVolunteerPost(volunteerPost)
      .then(() => {
        return getAllVolunteerPosts()
      })
      .then((res) => {
        const volunteerPostsDefault = res.data.body;
        volunteerPostsDefault.sort((a, b) => (a.Time > b.Time) ? 1 : -1);

        this.setState({ volunteerPostsDefault });
        this.setState({ volunteerPosts: volunteerPostsDefault})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  shouldDisplaySignUpButton(volunteerPost) {
    const user = VolunteerPool.getCurrentUser();
    if (user){
      const username = user.username;
      if (!volunteerPost.volunteerIds || volunteerPost.volunteerIds.length == 0) {
        return true;
      }
      const filtered = volunteerPost.volunteerIds.filter(id => {
        return id.includes(username)
      })
      if (filtered.length != 0) {
        return false;
      }
      return true;
    }
  }

  getRowColor(volunteerPost) {
    if (!this.checkVolunteerSignIn() || this.shouldDisplaySignUpButton(volunteerPost)) {
      return null;
    }
    const style = {
      backgroundColor: 'blue'
    }
    return style;
  }

  checkAdminSignIn() {
    const user = AdminPool.getCurrentUser();
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  
  logoutUser(e) {
    var user = this.context;
    user.logout();
    alert('Logged out');
    window.location.reload();
    
  }



  render() {
    return (
      <React.Fragment>
        {/* {(this.checkVolunteerSignIn() || this.checkAdminSignIn()) && 
          <Link className="btn btn-primary btn-large m-3" to="../profile/profile">Profile</Link>
        } */}
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
        <div style={{display:"inline-flex"}}>
          <button className="btn btn-primary btn-large m-3" onClick={this.logoutUser.bind(this)}>
            Logout
          </button>
          <p className="m-3">Signed in as: <b>{this.state.email}</b></p>
          </div>
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
              <tr key={volunteerPost.id} id={volunteerPost.id} style={this.getRowColor(volunteerPost)}>
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
                {this.checkVolunteerSignIn() && this.shouldDisplaySignUpButton(volunteerPost) &&
                  <button value={volunteerPost.id} id={"Button:" + volunteerPost.id} onClick={this.handleSignUp.bind(this)} className="btn-info btn-sm m-3" >
                    Sign Up
                  </button>
                }
                {this.checkVolunteerSignIn() && !this.shouldDisplaySignUpButton(volunteerPost) &&
                  <button value={volunteerPost.id} id={"Button:" + volunteerPost.id} disabled={true} className="btn-info btn-sm m-3" >
                    Signed Up
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
