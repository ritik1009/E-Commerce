const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },user_cart:{
        type:Array
    }
},
{timestamps:true}
)

module.exports = mongoose.model("User",UserSchema);