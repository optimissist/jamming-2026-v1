import styles from './SearchResults.module.css'
import Track from '../Track/Track';

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
            {/* {searchResults.map(track =>  <Track key={track.id} track={track}/>)} */}
        </div>
    )
}

export default SearchResults;