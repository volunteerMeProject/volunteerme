const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    getAllVolunteerPostsAPI: process.env.REACT_APP_VOLUNTEER_API_URL
}