import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Accounts';

export default () => {
    const [status, setStatus] = useState(false);

    const { getSession } = useContext(AccountContext);

    useEffect( () => {
        getSession()
            .then(session => {
                console.log('something');
                console.log('Session:', session);
                setStatus(true);
            })
            .catch(err => {
                console.log('err:', err);
            })
    }, []);

    return (
        <div>
            {status ? 'You are logged in' : 'Please login'}
        </div>
    );
};