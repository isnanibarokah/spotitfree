const Track = ({ url, title, artist }) => {
    return (
      <div className="box-Playlist">
        <img src={url} alt="Track Playlist" />
        <h3>{title}</h3>
        <p>{artist}</p>
        <br></br>
        <button className="btn-primary btn-select">Select</button>
      </div>
    );
  };
  
  export default Track;