const Track = ({ url, title, artist }) => {
    return (
      <div className="boxPlaylist">
        <h2>Playing From Playlist</h2>
        <img src={url} alt="Track Playlist" />
        <h3>{title}</h3>
        <p>{artist}</p>
        <br></br>
        <button className="btnSelect">Select</button>
      </div>
    );
  };
  
  export default Track;