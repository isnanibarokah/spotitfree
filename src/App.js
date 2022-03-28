import "./App.css";
import data from "./data.js";
import Track from "./components/track";

// const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

function App() {
  const trackList = data.map((track) => (
    <Track
      key={track.id}
      url={track.album.images[0].url}
      title={track.name}
      artist={track.artists[0].name}
    />
  ));

  return (
    <div className="container">
      <h2>Playing From Playlist</h2>
      <div className="trackList">{trackList}</div>
    </div>
  );
}

export default App;
