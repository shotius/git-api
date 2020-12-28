const UserInfo = ({avatar, gitPage, name, userType, repos, organizations}) => {
    return (
      <>
        <img src={avatar} alt="user avatar" id="userAvatar"/>
        <div id="userName"><strong>Name: </strong><a href={gitPage} target="_blank">{name}</a></div>
        <div id="userType"><strong>Type: </strong>{userType}</div>
        <div id="userRepos">
          <strong>repos: </strong>
          <ul>
            { 
            // loop through user repositoris and display then in a list
              repos.length
                ? repos.map((repo, i) => <li key={i}>{repo.full_name}</li>)
                : <p>no repositoris for this user</p>
            }
          </ul>
        </div>
        <div id="userOrgs">
            <strong>Organizations: </strong>
            <ul>
                {
                    // loop though user organizations and display in a list 
                    organizations.length
                        ? organizations.map((org, i) => {
                            return(
                                <li key={i}>
                                    <img src={org.avatar} style={{width:"30px"}}/>
                                    <a href={`https://github.com/${org.name}`} target="_blank">{org.name } </a>
                                </li>
                            )
                        })
                        : <p>no organizations for this user</p>
                }
            </ul>
        </div>
      </>
    )
  }

  export default UserInfo