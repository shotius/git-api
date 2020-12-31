/**this module is responsible to find desired user,
 * get informations, sach are avataer, type, repositories, organizations...
 * for fething information is used mini library "octokit"
 */


import {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom"
import UserInfo from './UserInfo'

function UserPage ({ setUsername, octokit})  {
  const [organizations, setOrganizations] = useState([]) // {name: [], avatar: ''}
  const [backToHome, setBackToHome] = useState(false)
  const [error , setError] = useState('no error')
  const [userType, setUserType] = useState('')
  const [gitPage, setGitPage] = useState('')
  const [avatar, setAvatar] = useState('')
  const [repos, setRepos] = useState([])
  const [name, setName] = useState('')

  function fire404Handler  () {
    setError("**Not Found**")
  }

  // on the first render fetch username api
  useEffect(() => {
    octokit
      .request(`GET https://api.github.com/users${window.location.pathname}`)
      .then(result => {

          // set states for fetched user
          setStates(result.data)
  
          // fetch repos
          octokit
            .request(`GET ${result.data.repos_url}`)
            .then(
              (result) =>{
                if (result.data.length > 0){
                  setRepos(result.data.slice(0,3))
              }
            })
            .catch(err => console.log(err))

            // fetch organizations
            octokit
              .request(`GET ${result.data.organizations_url}`)
              .then(
                (result) => {
                  // console.log(result.data)
                  if (result.data.length){
                    // if user is in some organizations get info about them
                    getOrganizationInfo(result.data)

                  }
              })
              .catch(err => console.log(err))

      })
      // catching errors if user not found
      .catch( (err) => {
        // if user not found we set error to the **Not Found**
        if (err.status === 404){
          // this function is responsible for setting error variable to "**Not Found**" string
          fire404Handler()
        } else {
          console.log(err.message)
        }
      })
  }, [])


  // is executed when organization info about user is fetched
  // organizations are saved in a variable
  const getOrganizationInfo = (organizationsData) => {
    let orgInfo = []
    // loop through all organization data and create new object each time
    organizationsData.map(org => {
      const newOrgInfo = {
        name: org.login,
        avatar: org.avatar_url
      }
      orgInfo = orgInfo.concat(newOrgInfo)
    })
    // when creating new array with all organizations
    // set this array to the 'organizations' state
    setOrganizations(orgInfo)
  }

  // set all state after fetching api
  const setStates = (obj) => {
      setAvatar(obj.avatar_url)
      setName(obj.login)
      setGitPage(obj.html_url)
      setUserType(obj.type)

  }

    // since on submit form page rerenders 
    // this function will redirect user to the /:username route
    if (backToHome) {
      return <Redirect push to={{ pathname: `/`, }} />
    } 


    // button handler that takes back to the home page
    const handleBack = (e) => {
      e.preventDefault();
      setBackToHome(true)
      setUsername('')
    }

    return (
      <div>
          <button id="btnHome"  type="submit" onClick={handleBack}> back to search </button>
        
          <br/>
        
        <div>
          {
            /**firstly we check if user is not found
             * second if the user's flag (**Not Found**) is not set probably it is still fetching
             * (in case name is not set, that meand user api is fetching)
             * else user is found and display info about the user
             */
            error === "**Not Found**"
            ? <p>{error}</p>
            : name.length === 0 
            ? <p>fetching...</p>
            : <UserInfo 
                  organizations={organizations}
                  userType={userType}
                  gitPage={gitPage}
                  avatar={avatar}
                  repos={repos}
                  name={name}
                />
            
          }  
          </div>
      </div>
    );
  }

    
  export default UserPage