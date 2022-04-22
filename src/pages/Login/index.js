import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../setup/config';
import { getUserProfile } from '../../setup/fetchApi';
import { login } from '../../setup/authSlice';
import { Anchor } from '@mantine/core';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessTokenParams = params.get('#access_token');

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
          history.push('/create-playlist');
        } catch (e) {
          alert(e);
        }
      };
      setUserProfile();
    }
  }, []);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    // eslint-disable-next-line no-undef
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

  return (
    <div className="login-wrapper">
      <p>
        Login to Spotitfree here.
      </p>
      <Anchor href={getSpotifyLinkAuthorize()} color="yellow" radius="md" size="md" uppercase>
        LOGIN
      </Anchor>
    </div>
  );
}
