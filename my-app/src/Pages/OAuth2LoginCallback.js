
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../Utils/Jwt-Utils';

const OAuth2Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // First try query param
    const queryParams = new URLSearchParams(window.location.search);
    let token = queryParams.get("token");

    // If not found in query, try hash
    if (!token && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      token = hashParams.get("token");
    }

    if (token) {
      console.log("Access token received:", token);
      saveToken(token);
      navigate('/');
    }
    // } else {
    //   console.error("Token not found");
    //   navigate('/');
    // }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default OAuth2Callback;

