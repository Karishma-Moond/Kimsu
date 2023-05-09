import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.delete('/logout');
        history.push('/login');
      } catch (error) {
        console.log(error);
      }
    };
    handleLogout();
  }, [history]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
