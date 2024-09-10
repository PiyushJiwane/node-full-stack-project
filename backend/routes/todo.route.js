const express = require("express");
const {saveTodo, retriveTodo} = require("../controller/todo.controller");
const userIdValidator = require("../middleware/userIdValidator");

const todo_route = express.Router()
const initPath="/todo/api/v1"

todo_route.get(`${initPath}/todo/:userId`,userIdValidator, retriveTodo)
todo_route.post(`${initPath}/todo/:userId`,userIdValidator, saveTodo)

module.exports = todo_route