import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VolunteerTable from "./volunteer/VolunteerTable";

class HomePage extends Component {
    state = {}


    render() { 
        return (
          <React.Fragment>
            <VolunteerTable/>
          </React.Fragment>
        );
    }
}
 
export default HomePage;