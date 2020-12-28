import Autocomplete from 'react-autocomplete'


const  SearchForm = ({ handleSubmit, handleUserInput, username, handleSelect}) => {
    var suggestionsToShow = [];
    var suggestions = []

    // get suggestions from sessionStorage (if they exist) and take only keys
    if (sessionStorage.getItem("suggestions")){
        
            suggestions = JSON.parse(sessionStorage.getItem('suggestions'))
            
            suggestions = Object.keys(suggestions)

    }

    
    /** if you want to show three last searches coment out filter method
     * and then uncoment slice method
     */

    // if something is typed in search bar suggestions will appear
    // if (username.length){
    //     suggestionsToShow = suggestions.filter(suggestion => 
    //         suggestion.toLowerCase().includes(username.toLowerCase())).slice(0,3)
    // } 

    suggestionsToShow = suggestions.slice(Math.max(suggestions.length - 3, 0))
    
    let labels  = []
    suggestionsToShow.map(sug => {
        labels = labels.concat({"label": sug})
    })

    console.log(labels)


    return (
        <>
        
            <form onSubmit={handleSubmit} >
                {/* <input onChange={handleUserInput} autoComplete="on"/> */}
                
               {/* {
                   suggestionsToShow.map((sugg, i) => <li key={i} className="suggestion">{sugg}</li>)
               } */}
               <Autocomplete
                    getItemValue={(item) => item.label}
                    items={labels}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                        </div>
                    }
                    value={username}
                    onChange={handleUserInput}
                    onSelect={(val) => handleSelect(val)}
                    />
                <button id='btnUserSearch' type="submit">Search User</button>

            </form>
        </>
    )
}

export default SearchForm