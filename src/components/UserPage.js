function UserPage ({isSearching, setIsSearching}) {
    
    const handleBack = (e) => {
      e.preventDefault();
      setIsSearching(false)
    }

    return (
      <div>
        <h2>I cant believe I am on 'user' page</h2>
        <form onSubmit={handleBack}>
            <button type="submit">Home</button>
        </form>
      </div>
    );
  }
  
  export default UserPage