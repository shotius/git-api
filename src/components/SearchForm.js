const  SearchForm = ({ handleSubmit, handleUserInput, username }) => {
    var suggestionsToShow = [];
    
    // get suggestions from sessionStorage and take only keys
    let suggestions = JSON.parse(sessionStorage.getItem('suggestions'))
    suggestions = Object.keys(suggestions)

    // if something is typed in search bar suggestions will appear
    if (username.length){
        suggestionsToShow = suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(username.toLowerCase())).slice(0,3)
    } 
    
    return (
        <>
            <form onSubmit={handleSubmit} >
                <input onChange={handleUserInput} />
                <button id='btnUserSearch' type="submit">Search User</button>
               {
                   suggestionsToShow.map((sugg, i) => <li key={i} className="suggestion">{sugg}</li>)
               }
            </form>
        </>
    )
}

export default SearchForm