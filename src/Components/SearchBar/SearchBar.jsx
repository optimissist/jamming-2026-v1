import {useState} from 'react'
import styles from './SearchBar.module.css'

function SearchBar(props) {
    const [searchTerms, setSearchTerms] = useState("");
    
    const newSearchTerms = (event) => {
        setSearchTerms(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onSearch(searchTerms);
    }

    return (
        <div className={styles.SearchBar}>
            <form onSubmit={handleSubmit}>
            <input type="text" value={searchTerms} onChange={newSearchTerms}/>
            <button type="submit" className={styles.SearchButton}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;


// playlistName lives in App.js because it needs to flow down to other components (Playlist needs to display it). But "what's currently typed in the search box, before submitting" — does TrackList, Track, or Playlist need to see that, keystroke by keystroke, while the user is still typing? Or is it only SearchBar itself that cares about that in-progress value, until the moment they hit "search"?