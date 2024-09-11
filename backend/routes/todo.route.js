const express = require("express");
const {saveTodo, retriveTodo, inActiveTodo} = require("../controller/todo.controller");
const userIdValidator = require("../middleware/userIdValidator");

const todo_route = express.Router()
const initPath="/todo/api/v1"

todo_route.get(`${initPath}/todo/:userId`,userIdValidator, retriveTodo)
todo_route.post(`${initPath}/todo/:userId`,userIdValidator, saveTodo)
todo_route.put(`${initPath}/inActive/todo/:userId`,userIdValidator, inActiveTodo)

module.exports = todo_route