import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../setup/config';
import { getUserProfile } from '../../setup/fetchApi';
import { login } from '../../redux/authSlice';

const Login: React.FC = () => {
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

  const getSpotifyLinkAuthorize: () => string = () => {
    const state = Date.now().toString();

    return `${config.SPOTIFY_AUTH_URL}?client_id=${config.API_URL}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

  return (
    <div className="login-wrapper">
      <p>
        Login to Spotitfree here.
      </p>
      <a href={getSpotifyLinkAuthorize()} className="btn btn-login">
        Login
      </a>
    </div>
  );
};

export default Login;