const mongoose = require("mongoose");
const {Schema} = mongoose;


const categorySchema = new Schema({
    categoryType:String,
    categoryImage:String,
    quizzes:[
        {
         type:Schema.Types.ObjectId,
         ref:"Quiz"
        }
    ]
})

const Category = mongoose.model("Category",categorySchema);

module.exports={Category}