import {useState} from 'react';
import styles from './App.module.css';
import '../../index.css'
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


function App(props) {
const [searchResults, setSearchResults] = useState([{ name: "name1", artist: "artist1", album: "album1", id: 1, uri: "spotify:track:mock1"}, { name: "name2", artist: "artist2", album: "album2", id: 2, uri: "spotify:track:mock2"  }, { name: "name3", artist: "artist3", album: "album3", id: 3, uri: "spotify:track:mock3" }]);
const [playlistName, setPlaylistName] = useState("Playlist Name");
const [playlistTracks, setPlaylistTracks] = useState([{ name: "name1", artist: "artist1", album: "album1", id: 1, uri: "spotify:track:mock1"}, { name: "name2", artist: "artist2", album: "album2", id: 2, uri: "spotify:track:mock2"  }, { name: "name3", artist: "artist3", album: "album3", id: 3, uri: "spotify:track:mock3" }]);

function addTrack(newTrack) {
  const existingTrack = playlistTracks.some((playlistTrack) => playlistTrack.id === newTrack.id);
  if (!existingTrack) {
    setPlaylistTracks([newTrack, ...playlistTracks]);
  }
}

function removeTrack(oldTrack) {
  const existingTrack = playlistTracks.filter((playlistTrack) => playlistTrack.id !== oldTrack.id);
   setPlaylistTracks(existingTrack); //returns the array with the old track filtered out
}

function updatePlaylistName(event) {
  setPlaylistName(event.target.value);
}

function savePlaylist() {
const trackUri = playlistTracks.map(track => track.uri);
setPlaylistName("Playlist Name");
setPlaylistTracks([]);
}

  return (
    <div>
      <h1 className={styles.h1}>Ja<span className={styles.highlight}>mmm</span>ing</h1>
      <div className={styles.App}>
        <SearchResults searchResults={searchResults} onAdd={addTrack}/>
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} updatePlaylistName={updatePlaylistName} onSave={savePlaylist}/>
      </div>
    </div>
  )
}

export default App
