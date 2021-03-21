import logo from './logo.svg';
import './App.css';
// import SignIn from './component/SignIn';
// import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
import CreateVolunteer from './component/volunteer/CreateVolunteer'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UpdatePost from './component/volunteer/UpdatePost';
import profile from './component/profile/profile';

 


function App() {
  return (
      <Router>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/profile" component={profile}/>
        <Route exact path="/createvolunteer" component={CreateVolunteer}/>
        {/* <Route path="/signup" component={SignUp}/> */}
        {/* <Route path="/dashboard" component={Dashboard}/> */}
        <Route path='/UpdatePost/:id' component={UpdatePost}/>
      </Router>
  );
}

export default App;
