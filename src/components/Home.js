/**
 * this page is home page where are displayed the most popular users of github
 * each user is rendered by the component "UserCard" 
 * for fetching api is used "Octokit" mini library 
 */

import {useEffect, useState} from 'react'
import UserCard from './UserCard'
import SearchForm from './SearchForm'
import { Redirect } from "react-router-dom";


// main export function
const  Home = ({ username,setUsername, octokit }) => {
    // variable for famous users who are displayd on home page
    const [selebrities, setSelebrities] = useState([])
    // this boolean variable if true browser redirects to the /:username page
    const [isSearching, setIsSearching] = useState(false)
    // variable for switching list and grid view
    const [isListView, setIsListView] = useState(true)
    // variable for toggling list and grid style button text
    const [toggleBtn, setToggleBtn] = useState("grid")


  /**on the first load */
    
    useEffect(() => {
   
       /** on the first load if sessionStorage doesn't have suggestions 
         * we assign it it as an empty object
         * since sessionStorage supports only strings we stringify our suggestions while saving in
         * and parse again to json when we retrieve them to the application
         * on the first load, if sessionStorage doesn't have suggestions
         */
        if (!sessionStorage.getItem('suggestions')){
            sessionStorage.setItem('suggestions', JSON.stringify({}))
        } 

        /**  fetch data of the most popular users on github */
        // users who have more than 300 repos and more than 5000 followers    
        const url = "https://api.github.com/search/users?q=repos:%3E300+followers:%3E5000"
        octokit
            .request(`GET ${url}`)
            .then(
                (result) => {
                    setSelebrities(result.data.items)
                }
            )
            .catch(err => console.log(err.message))
    }, [])


/** handle functions */

    // to handle input user field on change (on each letter)
    const handleUserInput = (val) => {
        setUsername(val)
        
      }

    // this method is used for search form for selecting suggesntions
    const handleSelect = (val) => {
      setUsername(val)
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

      // handles toggling between styles, on button click
      const handleToggle = () => {
        if (isListView){
          setIsListView(false)
          setToggleBtn("grid");
        } else {
          setIsListView(true)
          setToggleBtn("list")
        }
      }
      

    // since on submit form page rerenders 
    // this function will redirect user to the /:username route
    if (isSearching) {
        return <Redirect push to={{
          pathname: `/${username}`,
        }}
        />
      } 

    return (
        <div>
          <div id="divSearchForm">
            {/* user search form  */}
            <SearchForm 
                  handleUserInput={handleUserInput}
                  handleSelect={handleSelect}
                  handleSubmit={handleSubmit}
                  username={username}
                  />

          </div>
          
          {/* here is toggle button between List and Grid styles */}
         <div id="container">
            <h2 className="title">Selebrities On GitHub</h2>
            <button id="toggleBtn" onClick={handleToggle}>{toggleBtn}</button>
              {
                isListView
                ?
                (
                  // famous user are displayed here in list style
                  <div id="famousUsersList">
                        {
                          selebrities.map(
                            user => 
                                  <UserCard 
                                      key={user.id}
                                      user={user}
                                      octokit={octokit}
                                  />
                            )
                        }
                      </div>
                    )
                  : 
                  (
                    // famous user in Grid style
                    <div id="famousUsersGrid">
                      <p>grid style</p>
                    </div>
                  )
              }
            </div>
        </div>
    )
}

export default Home