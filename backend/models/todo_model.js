const { default: mongoose, Schema } = require("mongoose");

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true, "please provide the title"]
    },
    desc:{
        type:String,
        trim:true,
        required:[true, "please provide the desc"]
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

const todoSchema_wId=new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    todo:todoSchema
})


const todoModel = mongoose.model("todo", todoSchema_wId)

module.exports = todoModel