const  SearchForm = ({ handleSubmit, handleUserInput, suggestions, username }) => {
    var suggestionsToShow = [];
   
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
                   suggestionsToShow.map((sugg, i) => <li key={i}>{sugg}</li>)
               }
            </form>
        </>
    )
}

export default SearchForm