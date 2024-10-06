const express = require("express");
const {saveTodo, retriveTodo, inActiveTodo,updateTodo} = require("../controller/todo.controller");
const userIdValidator = require("../middleware/userIdValidator");
const verifyJWT = require("../middleware/verifyJWT.middleware");

const todo_route = express.Router()
const initPath="/todo/api/v1"

todo_route.get(`${initPath}/todo/:userId`,[userIdValidator,verifyJWT], retriveTodo)
todo_route.post(`${initPath}/todo/:userId`,[userIdValidator,verifyJWT], saveTodo)
todo_route.put(`${initPath}/inActive/todo/:userId`,[userIdValidator,verifyJWT], inActiveTodo)
todo_route.put(`${initPath}/update/todo/:userId`,[userIdValidator,verifyJWT], updateTodo)

module.exports = todo_route