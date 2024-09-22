const jwt = require("jsonwebtoken")
require('dotenv/config')

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(`authHeader : ${authHeader}`);
    
    if (!authHeader) return res.sendStatus(401)
    
    const jwt_token = authHeader.split(" ")[1]
    jwt.verify(jwt_token, JWT_SECRETE_KEY, function (err, decoded) {
        if (err) {
            console.log(`JWT Verification Error: ${err.message}`);
            return res.sendStatus(403); // Token is invalid or expired
        }
        console.log(decoded._id);
        req.id = decoded._id
        next()
    });
    next()
}

module.exports=verifyJWT