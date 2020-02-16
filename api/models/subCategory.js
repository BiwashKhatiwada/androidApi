
const mongoose = require('mongoose');
const subCategorySchema = mongoose.Schema({
    _catId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_category",
        required:true
      },
      _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_users",
        required:true
      },
      _subCatName:String,
      _locationName:String,
      _longitude :String,
      _lattitude  :String,
      _description: String,
      _image: {type:String,default:""}
});

var subcategory=mongoose.model('tbl_subcategory', subCategorySchema);;
module.exports = subcategory;