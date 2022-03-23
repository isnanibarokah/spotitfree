import logo from './logo.svg';
import './App.css';
import data from './data.js';


const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

function App() {
  return (
    <div className="boxPlaylist">
      <h2>Playing From Playlist</h2>
      <img src={data.album.images[0].url} alt="ImagePlaylist" />
      <h3>{data.name}</h3>
      <p>{data.album.artists[0].name}</p>
      <br></br>
      <button className="btnSelect">Select</button>
    </div>
  );
}

export default App;
