/**
 * - this compnent is ancestor of 'Home' and 'UserPage' components 
 * - two states,  user search variable and searching boolean kept in this component
 * - file consists two main routs
 */
import {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import Home from './components/Home'
import UserPage from './components/UserPage'

const { Octokit } = require("@octokit/core");
const octokit = new Octokit({auth: `${process.env.REACT_APP_TOKEN}`});


export default function App() {
  // this boolean variable if true browser redirects to the /:username page
  const [isSearching, setIsSearching] = useState(false)
  // this is username variable to search for
  const [username, setUsername] = useState('')

   /**
    * this effect is used for setting searched suggestions
    * it is executed once when page loads.
    * since sessionStorage supports only strings we stringify our suggestions while saving in
    * and parse again to json when we retrieve them to the application
    */
  useEffect(() => {
    // on the first load, if sessionStorage doesn't have suggestions
    if (!sessionStorage.getItem('suggestions')){
      sessionStorage.setItem('suggestions', JSON.stringify({}))
    } 
  }, [])
  
  
    // to handle input user field on change
    const handleUserInput = (e) => {
      setUsername(e.target.value)
    }
    
    // this is for search button submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSearching(true) // redirects to the /:username page

      // save new suggestion in sessionStorage
      let suggestions = JSON.parse(sessionStorage.getItem('suggestions'))
      suggestions[username] = username
      sessionStorage.setItem('suggestions',JSON.stringify(suggestions))
      
    }
    
  
  return (
    <Router>

        {/* if search button is clicked, we redirect to the the page where is displayed user info */}
        {/* {isSearching ? <Redirect to={`/${username}`}/> : <Redirect to="/" />} */}
        
      {/*we got two routes
        '/'  - route is renders <Home/> component
        '/:username' - route randers <UserPage/> component*/}
        <Switch>
          <Route path="/:username">
            <UserPage 
                setIsSearching={setIsSearching}
                setUsername={setUsername}
                username={username}
                octokit={octokit}
                />
          </Route>
          <Route path="/">
            <Home 
                handleUserInput={handleUserInput}
                handleSubmit={handleSubmit}
                username={username}
                octokit={octokit}
                isSearching={isSearching}
                />
          </Route>
        </Switch>
    
    </Router>
  );
}