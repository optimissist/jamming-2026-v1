import styles from './TrackList.module.css'

function TrackList(props) {
    
    return (
        <div className={styles.TrackList}>
            {props.tracks.map(track =>  <Track key={track.id} track={track}/>)}
        </div>
    )
}

export default TrackList;
