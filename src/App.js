import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
//import {  } from 'react-router'
import {useState} from 'react'

export default function App() {
  const [isRedirect, setIsRedirect] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsRedirect(true)
  } 

  return (
    <Router>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
        </div>
        
        {isRedirect ? <Redirect to="/about"/> : <Redirect to="/" />}
        
        <Switch>
          <Route exact path="/about">
            <About setIsRedirect={setIsRedirect} isRedirect={isRedirect}/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About({isRedirect, setIsRedirect}) {
  const handleBack = (e) => {
    e.preventDefault();
    console.log("clicked back")
    setIsRedirect(false)
  }
  console.log(isRedirect) 
  return (
    <div>
    <h2>I cant believe I am on 'About' page</h2>
    <form onSubmit={handleBack}>
      <button type="submit">back to main</button>
    </form>
    </div>

  );
}
