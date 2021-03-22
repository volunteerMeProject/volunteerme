const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    volunteerPostApiUrl: process.env.REACT_APP_VOLUNTEER_API_URL,
    profileApiUrl: process.env.REACT_APP_PROFILE_API_URL
}