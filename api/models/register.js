const mongoose = require('mongoose');
const register = mongoose.Schema({
    _userEmail:{type:String,trim:true,required:true,unique:true},
    _userPassword:String,
    _userPhone:String,
    _fullName:String,
    _userImage:{type:String,default:""},
    _token:{
        type:String,
        default:""
    },
    _userStatus:{type:Number,default:0},
    _userType:{type:Number,default:0}
});

module.exports = mongoose.model('tbl_users', register);