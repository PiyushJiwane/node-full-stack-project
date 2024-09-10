const { default: mongoose } = require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:[true, "please provide the username"]
    },
    email:{
        type:String,
        trim:true,
        required:[true, "lease provide the email"]
    },
    password:{
        type:String,
        trim:true,
        required:[true, "please provide the password"],
        minlength:[8, "poassword must be in length of greater than 8 character."]
    }
})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel