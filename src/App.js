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
  const [suggestions, setSuggestions] = useState([])
  
  var val;

  useEffect(() => {
    if (!localStorage.getItem('someVar')){
      val = 1
      console.log("first set val")
      localStorage.setItem("someVar", val);
    } else {
      val = localStorage.getItem('someVar')
      console.log("first get value", val)
    }
    
  }, [])
  
  
    console.log("second get value", localStorage.getItem('someVar'))
    
    // this is for input field change
    const handleUserInput = (e) => {
      setUsername(e.target.value)

      
      val = localStorage.getItem('someVar')
      val ++
      localStorage.setItem("someVar", val);
      console.log("setting value ", val)
    }
    
    // this is for search button submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSearching(true)
      setSuggestions(suggestions.concat(username))
  
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