import styles from './Playlist.module.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props) {

    return (
        <div className={styles.Playlist}>
            <input type="text" value={props.playlistName} onChange={props.updatePlaylistName}/>
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} />
            <button className={styles.PlaylistSave} onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;