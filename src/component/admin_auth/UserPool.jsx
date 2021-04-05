import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_hlRyJddSG',
  ClientId: '5esvetn1ck838b4iqg4bumd3su'
};

export default new CognitoUserPool(poolData);