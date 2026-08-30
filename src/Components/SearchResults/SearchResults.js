import styles from './SearchResults.module.css'
import Track from '../Track/Track';

function SearchResults() {
    return (
        <div className={styles.SearchResults}>
        </div>
    )
}

export default SearchResults;

// searchResults.map(track =>  <Track key={track.id} track={track}/>)