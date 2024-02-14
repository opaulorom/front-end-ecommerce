// Profile.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar';

const Profile = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      {isAuthenticated ? (
        <>
          <p>Welcome, user!</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <>
          <p>Please log in</p>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </>
      )}
    </div>
  );
};

export default Profile;
