import React, { useEffect, useState } from "react";
import Track from "../../components/track";
import Searchbar from "../../components/searchbar";
import config from "../../setup/config";
import FormPlaylist from "../../components/formplaylist";
import { getUserProfile } from "../../setup/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../setup/authSlice";

export default function Home() {
  const [tracks, setTracks] = useState([]);
    const [selectedTrackURI, setSelectedTrackURI] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const accessTokenParams = params.get("#access_token");

        if (accessTokenParams !== null) {
            const setUserProfile = async () => {
                try {
                    const response = await getUserProfile(accessTokenParams);
                    dispatch(
                        login({
                            accessToken: accessTokenParams,
                            user: response,
                        })
                    );
                } catch (e) {
                    alert(e);
                }
            };
            setUserProfile();
        }
      }, []);

      useEffect(() => {
        if (!isSearch) {
            const selectedTracks = filterSelectedTracks();

            setTracks(selectedTracks);
        }
    }, [selectedTrackURI]);

    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };

    const filterSelectedTracks = () => {
        return tracks.filter((track) => selectedTrackURI.includes(track.uri));
    };

    const handleSuccessSearch = (searchTracks) => {
        setIsSearch(true);

        const selectedSearchTracks = searchTracks.filter((data) =>
            selectedTrackURI.includes(data.uri)
        );

        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
    };

    const clearSearch = () => {
        setTracks(selectedTracks);
        setIsSearch(false);
    };

    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTrackURI.includes(uri)) {
            setSelectedTrackURI(
                selectedTrackURI.filter((item) => item !== uri)
            );
            setSelectedTracks(
                selectedTrackURI.filter((item) => item.uri !== uri)
            );
        } else {
            setSelectedTrackURI([...selectedTrackURI, uri]);
            setSelectedTracks([...selectedTracks, track]);
        }
    };

    return (
        <div className="container">
            {!isAuthorized && (
                <div className="login-app">
                    <p>Login to Spotitfree here.</p>
                    <a href={getSpotifyLinkAuthorize()} className="btn btn-login">
                      Login
                    </a>
                </div>
            )}

            {isAuthorized && (
                <>
                    <h1>Spotit</h1>
                    <FormPlaylist uris={selectedTrackURI} />
                    <hr />

                    <h3>Search Playlist</h3>
                    <Searchbar
                        onSuccess={(tracks) => handleSuccessSearch(tracks)}
                        onClearSearch={clearSearch}
                    />

                    {tracks.length === 0 && <p>No tracks</p>}

                    <div className="track-list">
                        {tracks.map((track) => (
                            <Track
                                key={track.id}
                                url={track.album.images[0].url}
                                title={track.name}
                                artist={track.artists[0].name}
                                select={selectedTrackURI.includes(track.uri)}
                                toggle={() => toggleSelect(track)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}