const mongoose = require("mongoose");
const {Schema} = mongoose;


const CategorySchema = new Schema({
    categoryType:String,
    categoryImage:String,
    quizzes:[
        {
         type:Schema.Types.ObjectId,
         ref:"Quiz"
        }
    ]
})