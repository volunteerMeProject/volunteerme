import logo from './logo.svg';
import './App.css';
// import SignIn from './component/SignIn';
// import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import profile from './component/profile/profile';

 


function App() {
  return (
      <Router>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/profile" component={profile}/>
        {/* <Route path="/signup" component={SignUp}/> */}
        {/* <Route path="/dashboard" component={Dashboard}/> */}
      </Router>
  );
}

export default App;
