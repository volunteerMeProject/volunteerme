import React, { Component } from 'react';

class VolunteerTable extends Component {
  state = {
    volunteerPosts: [],
  }
  
  
  render() { 
    const style = {
      
    }
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
        </table>
      </React.Fragment>
    );
  }
}
 
export default VolunteerTable;