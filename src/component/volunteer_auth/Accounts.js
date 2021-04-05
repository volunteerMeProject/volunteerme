import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import CognitoUserPool from '../../UserPool';

const AccountContext = createContext();

const Account = props => {

    const getSession = async () => 
        await new Promise((resolve, reject) => {
            const user = CognitoUserPool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject();
            }
        });

    const authenticate = async (Username, Password) => 
        await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: Username,
                Pool: CognitoUserPool
            });

            const authDetails = new AuthenticationDetails({
                Username: Username,
                Password: Password
            });

            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    console.log('onSuccess:', data);
                    resolve(data);
                },
                onFailure: err => {
                    console.log('onFailure:', err);
                    reject(err);
                },
                newPasswordRequired: data => {
                    console.log('newPasswordRequired:', data);
                    resolve(data);
                }

            });
        });    

    return (
        <AccountContext.Provider value={{
            authenticate,
            getSession
        }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };