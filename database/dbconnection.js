const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://traveltourist:test@123@cluster0-pgius.mongodb.net/traveltourist',
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
