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
const  Home = ({ handleSubmit, handleUserInput, username, octokit, isSearching }) => {
    const [selebrities, setSelebrities] = useState([])

    // fetch data of the most popular users on github 
    // only once - on first render
    useEffect(() => {
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

    if (isSearching) {
        return <Redirect push to={{
          pathname: '/result',
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