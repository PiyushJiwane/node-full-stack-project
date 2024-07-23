const express = require("express");
const { signup, updateUser, deleteUser, sendOtp, checkUser } = require("../controller/signup_controller");
const userValidator = require("../middleware/userValidator.middleware");
const emailValidator = require("../middleware/emailValidator.middleware");

const signup_route = express.Router()

// signup_route.get("/", getUserName)
signup_route.post("/checkUser",emailValidator,checkUser)
signup_route.post("/",userValidator, signup)
signup_route.post("/otpValidation",emailValidator, sendOtp)
signup_route.put("/", signup)
signup_route.delete("/:userId", deleteUser)

module.exports = signup_route