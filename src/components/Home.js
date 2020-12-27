/**
 * this page is home page where are displayed the most popular users of github
 * each user has is rendered by the component "UserCard" 
 * for fetching api is used "Octokit" mini library 
 */

import {useEffect, useState} from 'react'
import UserCard from './UserCard'
import SearchForm from './SearchForm'

// this mini library is for github rest api to raise up rate limit
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `59c5864516ea1c9d9a42bcd14b9f4b11f42e22db` });

//console.log(process.env.TOKEN)

// main export function
const  Home = ({ handleSubmit, handleUserInput, suggestions, username }) => {
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
    }, [])

    return (
        <div>
          {/* user search form  */}
          <SearchForm 
                handleSubmit={handleSubmit}
                handleUserInput={handleUserInput}
                suggestions={suggestions}
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