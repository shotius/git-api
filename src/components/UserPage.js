import {useEffect} from 'react'

function UserPage ({setIsSearching, setUsername, username, octokit}) {
  // useEffect(() => {
  //   // octokit
  //   //   .request(`GET https://api.github.com/users${window.location.pathname}`)
  //   //   .then(result => {
  //   //     console.log(result.data)
  //   //   })
  // }, [])


console.log(window.location.pathname)

    // button handler that takes back to the home page
    const handleBack = (e) => {
      e.preventDefault();
      setIsSearching(false)
      setUsername('')
    }

    return (
      <div>
        {username}
            <button 
                type="submit" 
                onClick={handleBack}>
                  Home
            </button>
      </div>
    );
  }
  
  export default UserPage