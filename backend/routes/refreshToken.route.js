const express = require("express");
const generateRefreshTokenByAccessToken = require("../controller/refreshToken.controller");

const refreshToken_route = express.Router()
const initPath="/todo/api/v1"

refreshToken_route.post(`${initPath}/refreshToken`, generateRefreshTokenByAccessToken)

module.exports = refreshToken_route