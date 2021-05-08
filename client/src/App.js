import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utilities/privateRouter';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/Profile';
import Home from './components/Home';
import Film from './components/Film';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <PrivateRoute path='/profile'>
            <UserProfile/>
          </PrivateRoute>
          <Route path='/film/:id' component={Film} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
