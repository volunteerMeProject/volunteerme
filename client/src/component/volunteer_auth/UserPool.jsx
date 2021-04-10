import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { volunteer_user_pool_id, volunteer_client_id } from '../../config';

const poolData = {
    UserPoolId: volunteer_user_pool_id,
    ClientId: volunteer_client_id
};

export default new CognitoUserPool(poolData);