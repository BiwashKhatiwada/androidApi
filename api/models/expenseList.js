const mongoose = require('mongoose');
const expenseSchema = mongoose.Schema({
    _price: {type:Number},
    _expenseName:String,
    _expenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_expense",
        required:true
      }
});

module.exports = mongoose.model('tbl_expenseList', expenseSchema);