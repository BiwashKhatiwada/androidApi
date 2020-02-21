const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _subCatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_subcategory",
        required:true
      },
      _productName:String,
      _productPrice:Number,
      _productImage:String

});

module.exports = mongoose.model('tbl_product', productSchema);