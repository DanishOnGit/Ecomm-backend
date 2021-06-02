const mongoose = require("mongoose")
const {Schema} = mongoose;

const questionSchema = new Schema({
    question:String,
    questionCategory:String,
    questionSubCategory:String,
    points:Number,
    negativePoints:Number,
    options:[
        {
            type: Schema.Types.ObjectId,
            ref:"Option"
        }
    ]
})

const Question = mongoose.model("Question",questionSchema)

module.exports = {Question}