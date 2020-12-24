import {useEffect} from 'react'
import UserCard from './UserCard'

export default function Home ({
    handleSubmit,
    handleUserInput, 
    selebrities, 
    setSelebrities
}) {
   // fetch data off the most popular users on github
   useEffect(() => {
    const url = "https://api.github.com/search/users?q=repos:%3E300+followers:%3E5000"
    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                setSelebrities(result.items)
            }
        )
   }, [])

  //console.log(selebrities)
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <input onChange={handleUserInput}></input>
            <button id='btnUserSearch' type="submit">Search User</button>
          </form>


          <div id="famousUsers">
          {selebrities.map(user => 
              <UserCard 
                    key={user.id}
                    user={user}
                    />
          )}
        </div>
        </div>
    )
}
