const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    volunteerPostApiUrl: process.env.REACT_APP_VOLUNTEER_API_URL,
}