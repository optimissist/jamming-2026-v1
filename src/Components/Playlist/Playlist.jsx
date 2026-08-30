import styles from './Playlist.module.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props) {
    return (
        <div className={styles.Playlist}>
            <h2>{props.playlistName}</h2>
            <TrackList tracks={props.playlistTracks} />
        </div>
    )
}

export default Playlist;