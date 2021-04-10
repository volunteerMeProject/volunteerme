const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    volunteerPostApiUrl: process.env.REACT_APP_VOLUNTEER_API_URL,
    profileApiUrl: process.env.REACT_APP_PROFILE_API_URL,
    admin_user_pool_id: process.env.REACT_APP_ADMIN_USER_POOL_ID,
    admin_client_id: process.env.REACT_APP_ADMIN_CLIENT_ID,
    volunteer_user_pool_id: process.env.REACT_APP_VOLUNTEER_USER_POOL_ID,
    volunteer_client_id: process.env.REACT_APP_VOLUNTEER_CLIENT_ID
}