import styles from './Track.module.css'

function Track(props) {

    return (
        <div className={styles.Track}>
            <div className={styles.TrackInformation}>
                 <h5>{props.track.name}</h5>
                    <p>{props.track.artist} | {props.track.album}</p>
            </div>
            { props.isPlaylistTrack  ? <button className="TrackAction" onClick={() => props.onRemove(props.track)}>-</button> : <button className="TrackAction" onClick={() => props.onAdd(props.track)}>+</button>}
        </div>
    )
}

export default Track;