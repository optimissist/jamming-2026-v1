import styles from './SearchResults.module.css'
import Track from '../Track/Track';

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
            <h2>Results</h2>
            {props.searchResults.map(track =>  <Track key={track.id} track={track} isPlaylistTrack={false} onAdd={props.onAdd}/>)}
        </div>
    )
}

export default SearchResults;