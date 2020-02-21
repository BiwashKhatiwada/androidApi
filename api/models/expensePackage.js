const mongoose = require('mongoose');
const expenseSchema = mongoose.Schema({
    _packageName: {type:String,required:true},
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_users",
        required:true
      }
});

module.exports = mongoose.model('tbl_expense', expenseSchema);