const { default: mongoose } = require("mongoose");
const logger = require("../logging/logger");
const todoModel = require("../models/todo_model");

const saveTodo = async (req, res) => {
  const { userId } = req.params
  const { title, desc } = req.body
  try {
    const todoObj = new todoModel({
      userId,
      todo: {
        title,
        desc
      }
    })
    const todoSave = await todoObj.save()
    if (todoSave) {
      return res.status(201).json({
        "data": `success`
      })
    }
    res.status(400).json({ "data": `facing issue while saving the todo data data with id :${userId}` })
    throw new Error(`facing issue while saving the todo data with email :${userId}`)


    // const todoList = await todoModel.find({ userId: "66dc13eeda580cc8e8ea1bfc" }).populate('todo')

    // console.log(todoList);


    // Approach 1:
    // ===============
    // const todoUser=await todoModel.findById(_id)
    // console.log(todoUser);

    // if(todoUser){
    //     todoUser.todo.push(...[{
    //                 title:"abc3",
    //                 desc:"abc3"
    //             }])
    //     await todoUser.save()
    //         }



    // const todoObject=new todoListModel({
    //     _id:"66defe4e24ea0b59f7734841",
    //     todo:[{
    //         title:"abc3",
    //         desc:"abc3"
    //     }]
    // })

    // const todo_obj=await todoObject.save()
    // console.log(todo_obj);

  } catch (error) {
    logger.error(error.message);
  }
}

const retriveTodo = async (req, res) => {
  const { userId } = req.params
  try {
    const todoList = await todoModel.find({ userId }).populate({
      path: 'todo'
    })
    const filteredTodoList = todoList.filter(item => item.todo.isCompleted === false);
    res.send(filteredTodoList)
  } catch (error) {
    logger.error(error.message);
  }
}

// const todoId="66dff195d07777676f0859fe"
const inActiveTodo = async (req, res) => {
  const todoId  = req.params.userId
  try {
    const todo = await todoModel.findOne({ 'todo._id':todoId}) 

    if (!todo) {
      return res.status(200).json({ "data": `id : ${todoId} is not present...!!!` })
    }
    // todo.todo.isCompleted=true
    // const todoUpdate=await todo.save()
    const updateTodo = await todoModel.updateOne(
      { 'todo._id':todoId}, 
      { 'todo.isCompleted': true }, // Update 'isCompleted' field to false
      { new: true } // Return the updated document
    );
    
    if (!updateTodo) {
      return res.status(404).json({ "data": `error while saving data in db` })
    }
    res.status(200).json({"data":"save"})
  } catch (error) {
    logger.error(error.message);
  }
}

module.exports = {
  saveTodo,
  retriveTodo,
  inActiveTodo
}