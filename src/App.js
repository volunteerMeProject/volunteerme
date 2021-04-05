import './App.css';
import SignIn from './component/admin_auth/admin_signin';
import SignUp from './admin_signup';
import Dashboard from './component/Dashboard';
import CreateVolunteer from './component/volunteer/CreateVolunteer'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UpdatePost from './component/volunteer/UpdatePost';
import profile from './component/profile/profile';

 


function App() {
  return (
      <Router>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/profile" component={profile}/>
        <Route exact path="/createvolunteer" component={CreateVolunteer}/>

        <Route path='/UpdatePost/:id' component={UpdatePost}/>
      </Router>
  );
}

export default App;
