import {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom"


function UserPage ({ setUsername, octokit}) {
  const [backToHome, setBackToHome] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [gitPage, setGitPage] = useState('')
  const [userType, setUserType] = useState('')




  // on the first render fetch username api
  useEffect(() => {
    octokit
      .request(`GET https://api.github.com/users${window.location.pathname}`)
      .then(result => {
        console.log(result.data)
        setAvatar(result.data.avatar_url)
        setName(result.data.login)
        setGitPage(result.data.html_url)
        setUserType(result.data.type)
      })
  }, [])

    // since on submit form page rerenders 
    // this function will redirect user to the /:username route
    if (backToHome) {
      return <Redirect push to={{
        pathname: `/`,
      }}
      />
    } 

console.log(window.location.pathname)

    // button handler that takes back to the home page
    const handleBack = (e) => {
      e.preventDefault();
      setBackToHome(true)
      setUsername('')
      
    }

    return (
      <div>
        <img src={avatar} alt="user avatar" id="userAvatar"/>
        <div id="userName"><strong>Name: </strong><a href={gitPage}>{name}</a></div>
        <div id="userType"><strong>Type: </strong>{userType}</div>
        <br/>
            <button 
                type="submit" 
                onClick={handleBack}>
                  Home
            </button>
      </div>
    );
  }
  
  export default UserPage