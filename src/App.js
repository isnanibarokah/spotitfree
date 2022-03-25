import "./App.css";
import data from "./data.js";
import Track from "./components/track";

// const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

function App() {
  return (
    <div className="container">
      <Track
        url={data.album.images[0].url}
        title={data.name}
        artist={data.album.artists[0].name}
      />
    </div>
  );
}

export default App;
