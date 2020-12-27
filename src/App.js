/**
 * - this compnent is ancestor of 'Home' and 'UserPage' components 
 * - two states,  user search variable and searching boolean kept in this component
 * - file consists two main routs
 * - we got two routes: 
 * '/' -  renders <Home/> component
 * '/:username' -  randers <UserPage/> component
 */
import {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/Home'
import UserPage from './components/UserPage'

const { Octokit } = require("@octokit/core");
const octokit = new Octokit({auth: `${process.env.REACT_APP_TOKEN}`});

export default function App() {
  // this is username variable to search for
  const [username, setUsername] = useState('')


  return (
    <Router>
        <Switch>
          <Route path="/:username">
            <UserPage 
                setUsername={setUsername}
                octokit={octokit}
                />
          </Route>
          <Route path="/">
            <Home 
                setUsername={setUsername}
                username={username}
                octokit={octokit}
                />
          </Route>
        </Switch>
    
    </Router>
  );
}