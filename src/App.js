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

export default function App() {
  // this boolean variable if true browser redirects to the /:username page
  const [isSearching, setIsSearching] = useState(false)
  // this is username variable to search for
  const [username, setUsername] = useState('')
  // this is for suggested words for search
  var suggestions;
  

   /**
    * this effect is used for setting search suggestions
    * it is executed once when page loads.
    * since sessionStorage supports only strings we stringify our suggestions while saving in
    * and parse again to json when we retrieve them to application
    */
  useEffect(() => {
    if (sessionStorage.getItem('suggestions')){
      // if we have something in sessionStorage set it to the suggestions
      suggestions = JSON.parse(sessionStorage.getItem('suggestions'))
    } else {
      // if it is first time when tab is open assign empty object to suggestions
      // and save it in sessionStorage
      suggestions = {}
      sessionStorage.setItem('suggestions', JSON.stringify(suggestions))
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

      // save suggestions in sessionStorage
      suggestions = JSON.parse(sessionStorage.getItem('suggestions'))
      suggestions[username] = username
      sessionStorage.setItem('suggestions',JSON.stringify(suggestions))
      
  } 
  
  return (
    <Router>

        {/* if search button is clicked, we redirect to the the page where is displayed user info */}
        {isSearching ? <Redirect to={`/${username}`}/> : <Redirect to="/" />}
        
      {/*we got two routes
        '/'  - route is renders <Home/> component
        '/:username' - route randers <UserPage/> component*/}
        <Switch>
          <Route exact path="/:username">
            <UserPage 
                setIsSearching={setIsSearching}
                setUsername={setUsername}
                />
          </Route>
          <Route exact path="/">
            <Home 
                handleUserInput={handleUserInput}
                handleSubmit={handleSubmit}
                suggestions={suggestions}
                username={username}
                />
          </Route>
        </Switch>
    
    </Router>
  );
}