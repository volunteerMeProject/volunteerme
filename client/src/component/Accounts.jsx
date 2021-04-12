import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import VolunteerPool from './volunteer_auth/UserPool';
import AdminPool from './admin_auth/UserPool';

const AccountContext = createContext();

const Account = props => {
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const admin = AdminPool.getCurrentUser();
      const volunteer = VolunteerPool.getCurrentUser();

      if (admin) {
        admin.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              admin.getUserAttributes((err, attributes) => {
                if(err) {
                  reject(err);
                } else {
                  const results = {};

                  for(let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });

            resolve({
              ... session,
              ... attributes
            });
          }
        });
      } else if(volunteer) {
        volunteer.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        console.log('Error, no session to get!');
      }
    });

  const AdminAuthenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool:AdminPool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: err => {
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: data => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        }
      });
    });

    const VolunteerAuthenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool:VolunteerPool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: err => {
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: data => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        }
      });
    });
  
  const logout = () => {
    const volunteer = VolunteerPool.getCurrentUser();
    const admin = AdminPool.getCurrentUser();

    if (volunteer) {
      volunteer.signOut();
    } else if (admin) {
      admin.signOut();
    } else {
      alert('No one to logout!');
    }
  }

  return (
    <AccountContext.Provider value={{
      AdminAuthenticate,
      VolunteerAuthenticate,
      getSession,
      logout
    }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };