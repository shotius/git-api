/* 
- this is card component of the home page to display famous users
- we have state for this component - "repos" - to save three
  three repositories of each user
- octokit library method fires only  one time to get three repos from each user
*/

import {useState, useEffect} from 'react'

function UserCard ({user, octokit, view}) {
    // we have this varible for every user, three repos for each
    const [repos, setRepos] = useState([])

    // when page renders It will fetch repos for each user 
    useEffect(() => {
        octokit
            .request(`GET ${user.repos_url}`)
            .then(result => {
                
                if (result.data.length > 0){
                    setRepos(result.data.slice(0,3))
                } 
            })
    }, [])
    
    // display single famous user info here
    return (
        <div className={view}>
            {/* avatar */}
            <div className="divSelebrityAvatar">
                <img 
                    className="imgFamousUser" 
                    src={user.avatar_url} 
                    alt="avatar" 
                    //style={{width: "30px"}}
                    />
            </div>

            <div className="divSelebrityTextInfo">
                {/* name */}
                <div className="divSelebrityName">
                    <strong>Name: </strong>
                    <a 
                        className="username_type_a" 
                        href={user.html_url} 
                        target="_blank"> 
                        {user.login}  
                    </a>
                </div>


                {/* type */}
                <div className="divSelebrityType">
                    <strong>Type: </strong>{user.type}
                </div>


                {/* Repositories */}
                <div className="divSelebrityRepos">
                    <strong>Repos: </strong>
                    <ul>
                        {
                            repos.length
                            ?repos.map((repo, i) => 
                            <li key={i}>{repo.name}</li>
                            )
                            : <p>no repo for this user</p>
                        }
                    </ul>
                </div>
                
            </div>
                
            
        </div>
    )
}

export default UserCard