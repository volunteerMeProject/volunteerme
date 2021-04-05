import './App.css';
import SignIn from './component/admin_auth/admin_signin';
// import SignUp from './admin_signup';
// import SignIn from './component/SignIn';
// import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
import CreateVolunteer from './component/volunteer/CreateVolunteer'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UpdatePost from './component/volunteer/UpdatePost';
import profile from './component/profile/profile';
import VolunteerSignIn from './component/volunteer_auth/Volunteer_sign_in';
import AdminSignUp from './component/AdminSignUp.jsx';

 


function App() {
  return (
      <Router>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/profile" component={profile}/>
        <Route exact path="/createvolunteer" component={CreateVolunteer}/>
        <Route exact path="/adminsignup" component={AdminSignUp}/>
        <Route path="/signup" component={SignUp}/>
        {/* <Route path="/dashboard" component={Dashboard}/> */}
        <Route path='/UpdatePost/:id' component={UpdatePost}/>
        <Route path='/volunteer_auth/Volunteer_sign_in' component={VolunteerSignIn}/>
      </Router>
  );
}

export default App;
