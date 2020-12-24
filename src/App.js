import {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Home from './components/Home'
import UserPage from './components/UserPage'

export default function App() {
  const [isSearching, setIsSearching] = useState(false)
  const [username, setUsername] = useState('')
  const [selebrities, setSelebrities] = useState([])

  // this is for input field 
  const handleUserInput = (e) => 
        setUsername(e.target.value)

  // this is for search button
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true)
  } 
  
  return (
    <Router>

        {/* if search button is clicked, we redirect to the the username page */}
        {isSearching ? <Redirect to={`/${username}`}/> : <Redirect to="/" />}

        
      {/*we got two routes
        '/'  - route is renders <Home/> component
        '/:username' - route randers <UserPage/> component*/}
        <Switch>
          <Route exact path="/:username">
            <UserPage 
                setIsSearching={setIsSearching}
                isSearching={isSearching}
                />
          </Route>
          <Route exact path="/">
            <Home 
                handleUserInput={handleUserInput}
                handleSubmit={handleSubmit}
                selebrities={selebrities}
                setSelebrities={setSelebrities}
                />
          </Route>
        </Switch>
    
    </Router>
  );
}