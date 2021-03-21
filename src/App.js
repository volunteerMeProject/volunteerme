import logo from './logo.svg';
import './App.css';
// import SignIn from './component/SignIn';
// import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UpdatePost from './component/volunteer/UpdatePost';
 


function App() {
  return (
      <Router>
        <Route exact path="/" component={Dashboard}/>
        {/* <Route path="/signup" component={SignUp}/> */}
        {/* <Route path="/dashboard" component={Dashboard}/> */}
        <Route path='/UpdatePost/' component={UpdatePost}/>
      </Router>
  );
}

export default App;
