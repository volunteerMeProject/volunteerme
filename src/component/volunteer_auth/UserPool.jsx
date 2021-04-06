<<<<<<< HEAD
import { CognitoUserPool } from "amazon-cognito-identity-js";

// Should be environment variables?
const poolData = {
  UserPoolId: "us-east-1_ygiGsE5BW",
  ClientId: "4n957elr8vtbpcc02o5qh47vsh",
};

export default new CognitoUserPool(poolData);
=======
import { CognitoUserPool } from 'amazon-cognito-identity-js';

// Should be environment variables?
const poolData = {
    UserPoolId: 'us-east-1_wvxC0Eexl',
    ClientId: '52i499nfldfvsmjjv55s0nkc0r'
};

export default new CognitoUserPool(poolData);
>>>>>>> 82a2c5d2f059bf4f477247755380de0a53c69673
