const express = require("express");
const {updateUser, deleteUser, login } = require("../controller/login.controller");
const loginValidator = require("../middleware/loginValidator");

const login_route = express.Router()
const initPath="/todo/api/v1"

login_route.post(`${initPath}/login`, loginValidator, login)
login_route.put(`${initPath}/updateUser/:userId`, updateUser)
login_route.delete(`${initPath}/deleteUser/:userId`, deleteUser)

module.exports = login_route