import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { admin_user_pool_id, admin_client_id } from '../../config';

const poolData = {
  UserPoolId: admin_user_pool_id,
  ClientId: admin_client_id
};

export default new CognitoUserPool(poolData);