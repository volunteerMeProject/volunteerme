import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Accounts';

export default () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then(session => {
        console.log('Session:', session);
        setStatus(true);
      })
  }, []);

  return (
    <React.Fragment>
      {status ? (
        <span>
          <button className='btn btn-primary btn-large m-3' onClick={logout}>Logout</button>
        </span>
      ) : ' '}
    </React.Fragment>
  );
};