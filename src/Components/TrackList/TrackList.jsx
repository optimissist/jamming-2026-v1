import styles from './TrackList.module.css'
import Track from '../Track/Track';

function TrackList(props) {
    
    return (
        <div className={styles.TrackList}>
            {props.tracks.map(track =>  <Track key={track.id} track={track} isPlaylistTrack={true} onRemove={props.onRemove}/>)}
        </div>
    )
}

export default TrackList;
