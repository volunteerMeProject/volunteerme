import './App.css';
import SignIn from './component/admin_auth/admin_signin';
// import SignUp from './admin_signup';
// import SignIn from './component/SignIn';
// import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
import CreatePost from './component/volunteer/CreatePost'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UpdatePost from './component/volunteer/UpdatePost';
import profile from './component/profile/profile';
import VolunteerSignIn from './component/volunteer_auth/Volunteer_sign_in';
import AdminSignUp from './component/admin_auth/admin_sign_up.jsx';
import VolunteerSignUp from './component/volunteer_auth/volunteer_sign_up';
import AdminSignIn from './component/admin_auth/admin_signin';

 


function App() {
  return (
      <Router>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/profile" component={profile}/>
        <Route exact path="/createpost" component={CreatePost}/>
        <Route exact path="/admin_auth/admin_sign_up" component={AdminSignUp}/>
        {/* <Route path="/dashboard" component={Dashboard}/> */}
        <Route path='/UpdatePost/:id' component={UpdatePost}/>
        <Route path='/volunteer_auth/Volunteer_sign_up' component={VolunteerSignUp}/>
        <Route path='/volunteer_auth/Volunteer_sign_in' component={VolunteerSignIn}/>
        <Route path='/admin_auth/admin_signin' component={AdminSignIn}/>
        <Route path='/profile/profile' component={profile}/>
      </Router>
  );
}

export default App;
