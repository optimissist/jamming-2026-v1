import {useState} from 'react';
import styles from './App.module.css';
import '../../index.css'
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


function App(props) {
const [searchResults, setSearchResults] = useState([{ name: "name1", artist: "artist1", album: "album1", id: 1 }, { name: "name2", artist: "artist2", album: "album2", id: 2 }, { name: "name3", artist: "artist3", album: "album3", id: 3 }]);
const [playlistName, setPlaylistName] = useState("Playlist Name");
const [playlistTracks, setPlaylistTracks] = useState([{ name: "playlistName1", artist: "playlistArtist1", album: "playlistAlbum1", id: 4 }, { name: "playlistName2", artist: "playlistArtist2", album: "playlistAlbum2", id: 5 }, { name: "playlistName3", artist: "playlistArtist3", album: "playlistAlbum3", id: 6 }])

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

  return (
    <div>
      <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
      <div className={styles.App}>
        <SearchResults searchResults={searchResults} onAdd={addTrack}/>
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack}/>
      </div>
    </div>
  )
}

export default App
