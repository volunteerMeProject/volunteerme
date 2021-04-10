import { CognitoUserPool } from 'amazon-cognito-identity-js';

// Should be environment variables?
const poolData = {
    UserPoolId: 'us-east-1_wvxC0Eexl',
    ClientId: '52i499nfldfvsmjjv55s0nkc0r'
};

export default new CognitoUserPool(poolData);