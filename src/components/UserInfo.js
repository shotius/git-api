const UserInfo = ({avatar, gitPage, name, userType, repos}) => {
    return (
      <>
        <img src={avatar} alt="user avatar" id="userAvatar"/>
        <div id="userName"><strong>Name: </strong><a href={gitPage} target="_blank">{name}</a></div>
        <div id="userType"><strong>Type: </strong>{userType}</div>
        <div id="userRepos">
          <strong>repos: </strong>
          {
            repos.map((repo, i) => <li key={i}>{repo.full_name || "no repositoris for this user"}</li>)
          }
        </div>
      </>
    )
  }

  export default UserInfo