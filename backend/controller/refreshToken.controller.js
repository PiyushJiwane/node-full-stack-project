const refreshTokenModel = require("../models/refreshToken_model");
const { generateJWTToken } = require("../middleware/jwtToken");

const jwt = require("jsonwebtoken")
require('dotenv/config')

const JWT_REFRESHTOKEN_SECRETE_KEY = process.env.JWT_REFRESHTOKEN_SECRETE_KEY

// Refresh token endpoint to generate a new Access Token
const generateRefreshTokenByAccessToken = (req, res) => {
    console.log(`req.cookies ----> ${JSON.stringify(req.cookies)}`);
    const { refreshToken } = req.cookies.jwt_refresh_token;

    console.log(`refreshToken ---> ${JSON.stringify(refreshToken)}`);
    
    if (!refreshToken) return res.sendStatus(401);
    
    jwt.verify(refreshToken, JWT_REFRESHTOKEN_SECRETE_KEY, async (err, decoded) => {
        console.log(`decoded ---> ${err}`);
        if (err) return res.sendStatus(403);

        const userId = decoded._id
        const user = refreshTokenModel.findOne({ userId }) // Invalid token
        
        if (!user) return res.sendStatus(403);

        const jwt_token = await generateJWTToken(decoded)
        console.log(`jwt_token ---> ${jwt_token}`);
        res.status(200).json({ jwt_token })
    });
}

module.exports=generateRefreshTokenByAccessToken