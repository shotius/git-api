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
          {/* user search form  */}
          <SearchForm 
                handleSubmit={handleSubmit}
                handleUserInput={handleUserInput}
                username={username}
                />

        {/* famous user are displayed here */}
          <div id="famousUsers">
            {
                selebrities.map(
                  user => 
                        <UserCard 
                            key={user.id}
                            user={user}
                            octokit={octokit}
                        />
            )}
          </div>
        </div>
    )
}

export default Home