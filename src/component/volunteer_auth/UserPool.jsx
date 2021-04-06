import { CognitoUserPool } from "amazon-cognito-identity-js";

// Should be environment variables?
const poolData = {
  UserPoolId: "us-east-1_ygiGsE5BW",
  ClientId: "4n957elr8vtbpcc02o5qh47vsh",
};

export default new CognitoUserPool(poolData);
