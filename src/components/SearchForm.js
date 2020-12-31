//import Autocomplete from 'react-autocomplete'
import Autocomplete from '@material-ui/lab/Autocomplete';

const  SearchForm = ({ handleSubmit, handleUserInput, username, handleSelect}) => {
    var suggestions = []

    // get suggestions from sessionStorage (if they exist) and take only keys
    if (sessionStorage.getItem("suggestions")){
        
            suggestions = JSON.parse(sessionStorage.getItem('suggestions'))
            suggestions = Object.keys(suggestions)

    }

    
    /** if you want to show all searched words in suggestions uncomment filter method
     * and comment slice method
     */

    // if something is typed in search bar suggestions will appear
    // if (username.length){
    //   var suggestionsToShow = suggestions.filter(suggestion => 
    //         suggestion.toLowerCase().includes(username.toLowerCase())).slice(0,3)
    // } 

    const  suggestionsToShow = suggestions.slice(Math.max(suggestions.length - 3, 0))

        return (
            <>
               <h1 id="header">Search For GitHub Users</h1>
            <form onSubmit={handleSubmit} id="searchForm">
                    <Autocomplete
                        id="search"
                        options={suggestionsToShow}
                        onChange={(event, newValue) => {
                            console.log("in")
                            //handleUserInput(newValue);
                          }}
                          inputValue={username}
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                            <input 
                                style=
                                {{
                                    width: 250,
                                    fontSize: 20,
                                    padding: 3
                                }} type="text" {...params.inputProps} onChange={({target}) => handleUserInput(target.value)}/>
                            </div>
                        )}
                        />
                <button id='btnUserSearch' type="submit">Search</button>

            </form>
        </>
    )
}

export default SearchForm