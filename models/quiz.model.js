const mongoose = require("mongoose")
const {Schema} = mongoose;
const {Question} = require("./question.model")


const QuizSchema = new Schema({
    quizType:String ,
    quizName:String,
    totalQuestions:Number,
    score:Number,
    questions:[
        {
            type:Schema.Types.ObjectId,
            ref:"Question"
        }
    ]

})

const Quiz = mongoose.model("Quiz",QuizSchema)
module.exports = {Quiz}