
const mongoose = require('mongoose');
const productReviewSchema = mongoose.Schema({
    _productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_product",
        required:true
      },
      _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_users",
        required:true
      },
      _rating:String,
      _comment:String
});

var productReview=mongoose.model('tbl_productReview', productReviewSchema);;
module.exports = productReview;