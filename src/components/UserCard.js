/* 
- this is card component of the home page to display famous users
- we have state for this component - "repos" - to save three
  three repositories of each user
- octokit library method fires only  one time to get three repos from each user
*/

import {useState, useEffect} from 'react'

function UserCard ({user, octokit}) {
    // we have this varible for every user, three repos for each
    const [repos, setRepos] = useState([])

    // for every user I want to fetch repos only one it renders
    useEffect(() => {
        octokit
            .request(`GET ${user.repos_url}`)
            .then(result => {
                
                if (result.data.length > 0){
                    setRepos(result.data.slice(0,3))
                } 
            })
    }, [])
    
    //  console.log(repos)
    return (
        <div className="userCard">
            <img 
                className="imgFamousUser" 
                src={user.avatar_url} 
                alt="avatar" 
                style={{width: "30px"}}
                ></img>

            <a 
                className="username_type_a" 
                href={user.html_url} 
                target="_blank"> {user.login} ({user.type}) </a>

            <ul className="repos_list">
            {
                repos.length
                ?repos.map((repo, i) => 
                    <li key={i}>{repo.name}</li>
                )
                : <p>no repo for this user</p>
            }
            {repos.length}
            </ul>
        </div>
    )
}

export default UserCard