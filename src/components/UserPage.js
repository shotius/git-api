function UserPage ({setIsSearching, setUsername}) {
    
    const handleBack = (e) => {
      e.preventDefault();
      setIsSearching(false)
      setUsername('')
    }

    return (
      <div>
        <h2>I cant believe I am on 'user' page</h2>
            <button 
                type="submit" 
                onClick={handleBack} 
                >
                  Home
            </button>
      </div>
    );
  }
  
  export default UserPage