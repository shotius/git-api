function UserCard ({user}) {
    // this function fetches repositories of the most famous users
    const getRepos = () => {
        fetch(user.repos_url)
            .then(result => {
                console.log((result.length))
            })
    }

    return (
        <div>
            <img src={user.avatar_url} alt="avatar" style={{width: "30px"}}></img>
            <a id="username" href={user.html_url} target="_blank">{user.login} ({user.type})</a>
            {getRepos()}
            <li><a href={user.repos_url}>repos</a></li>
        </div>
    )
}

export default UserCard