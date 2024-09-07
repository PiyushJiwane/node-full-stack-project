const jwt = require("jsonwebtoken")
require('dotenv/config')

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY

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

const isJWTTokenValid = (token) => {
    const date = new Date();
    // Verifying the JWT token 
    jwt.verify(token, JWT_SECRETE_KEY, function (err, decoded) {
        if (err) {
            console.log(`${date.getHours()}:${date.getMinutes()}
                                       :${date.getSeconds()}`);
            console.log(err);
            return true
        }
        else {
            console.log(`${date.getHours()}:${date.getMinutes()}
                                       :${date.getSeconds()}`);
            console.log("Token verifified successfully");
            return false
        }
    });
}


module.exports = generateJWTToken