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

module.exports = saveTodo