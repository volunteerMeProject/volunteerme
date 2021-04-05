import { CognitoUserPool } from 'amazon-cognito-identity-js';


// Should be environment variables
const poolData = {
    UserPoolId: 'us-east-1_QaTdOakhv',
    ClientId: '1hgf0i2otkvhdhq2m5cug3jv56'
};

export default new CognitoUserPool(poolData);