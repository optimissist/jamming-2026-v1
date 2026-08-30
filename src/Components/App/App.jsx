import {useState} from 'react';
import styles from './App.module.css';
import '../../index.css'
import SearchResults from './components/SearchResults/SearchResults';


function App(props) {
const [searchResults, setSearchResults] = useState([{ name: "name1", artist: "artist1", album: "album1", id: 1 }, { name: "name2", artist: "artist2", album: "album2", id: 2 }, { name: "name3", artist: "artist3", album: "album3", id: 3 }]);


  return (
    <div>
      <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
      <div className={styles.App}>
        <SearchResults searchResults={searchResults} />
      </div>
    </div>
  )
}

export default App
