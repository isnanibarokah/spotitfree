import React, { useState } from 'react';

interface IProps {
  url: string;
  title: string;
  artist: string;
  select: boolean;
  toggle: () => void;
}

const Track: React.FC<IProps> = ({ url, title, artist, select, toggle }) => {
  const [isSelected, setIsSelected] = useState<boolean>(select);

  const handleSelect: () => void = () => {
    setIsSelected(!isSelected);
    toggle();
  };

  return (
    <div className="box-Playlist">
      <img src={url} alt="Track Playlist" aria-label="image-track" />
      <div className="box-info">
        <h3 aria-label="title-track">{title}</h3>
        <p aria-label="artist-track">{artist}</p>
      </div>
      <button
        className={`btn btn-select ${
          isSelected ? 'btn-primary' : 'btn-secondary'
        }`}
        onClick={handleSelect}
      >
        {isSelected ? 'Deselect' : 'Select'}
      </button>
    </div>
  );
};

export default Track;