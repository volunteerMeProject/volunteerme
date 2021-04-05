import { CognitoUserPool } from 'amazon-cognito-identity-js';

// const poolData = {
//   UserPoolId: 'us-east-1_hlRyJddSG',
//   ClientId: '5esvetn1ck838b4iqg4bumd3su'
// };

const poolData = {
  UserPoolId: 'us-east-1_wvxC0Eexl',
  ClientId: '52i499nfldfvsmjjv55s0nkc0r'
};

export default new CognitoUserPool(poolData);