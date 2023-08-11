const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'name is required']
    },
    email:{
        type:String,
        required: [true, 'email is required']
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isDoctor:{
        type: Boolean,
        default: false
    },
    notification:{
        type: Array,
        default: []
    },
    seennotification:{
        type: Array,
        default: []
    },
    changeStatus:{
        type: Boolean,
        required: false
    },
    is_verified:{
        type: Number,
        default: 0
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel