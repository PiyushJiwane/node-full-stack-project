const jwt = require("jsonwebtoken")
require('dotenv/config')

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY
const JWT_REFRESHTOKEN_SECRETE_KEY = process.env.JWT_REFRESHTOKEN_SECRETE_KEY

const generateJWTToken = async (result) => {        
    // Calculate the timestamp for midnight
    let midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set time to 00:00:00 of the next day

    // Calculate the expiry time in seconds from now until midnight
    let expirySeconds = Math.floor((midnight.getTime() - Date.now()) / 1000);

    const jwt_token = await jwt.sign({
        _id: result._id,
        u_name: result.username
    }, JWT_SECRETE_KEY, {
        expiresIn: "1m"
    })
    return jwt_token
}

const generateJWTRefreshToken = async (result) => {        
    // Calculate the timestamp for midnight
    let midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set time to 00:00:00 of the next day

    // Calculate the expiry time in seconds from now until midnight
    let expirySeconds = Math.floor((midnight.getTime() - Date.now()) / 1000);

    const jwt_token = await jwt.sign({
        _id: result._id,
        u_name: result.username
    }, JWT_REFRESHTOKEN_SECRETE_KEY, {
        expiresIn: "7d"
    })
    return jwt_token
}


module.exports = {generateJWTToken, generateJWTRefreshToken}