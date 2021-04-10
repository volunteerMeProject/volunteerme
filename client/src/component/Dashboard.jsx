import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VolunteerTable from "./volunteer/VolunteerTable";

class HomePage extends Component {
    state = {}


    render() { 
        return (
          <React.Fragment>
            <Link className="btn btn-primary btn-large m-3" to="./profile">Profile</Link>
            <VolunteerTable />
          </React.Fragment>
        );
    }
}
 
export default HomePage;