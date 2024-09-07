const express = require("express");
const { signup, sendOtp, checkUser } = require("../controller/signup.controller");
const userValidator = require("../middleware/userValidator.middleware");
const emailValidator = require("../middleware/emailValidator.middleware");

const signup_route = express.Router()
const initPath="/todo/api/v1"

// signup_route.get("/", getUserName)
signup_route.get(`${initPath}/checkUser`,emailValidator,checkUser)
signup_route.post(`${initPath}/signup`,userValidator, signup)
signup_route.get(`${initPath}/otpValidation`,emailValidator, sendOtp)

module.exports = signup_route