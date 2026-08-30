import styles from './Track.module.css'

function Track(props) {
    return (
        <div className={styles.Track}>
            <div className={styles.TrackInformation}>
                {props.track.name} by {props.track.artist} from {props.track.album}
            </div>
        </div>
    )
}

export default Track;