const mongoose = require('mongoose');
const expenseSchema = mongoose.Schema({
    _expenseName:String,
    _price: {type:String},
    _expenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_expense",
        required:true
      },
      _date:String
});

module.exports = mongoose.model('tbl_expenseList', expenseSchema);