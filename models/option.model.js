const mongoose = require ("mongoose")
const {Schema} = mongoose;

const optionSchema = new Schema({
    text:String,
    isRight:Boolean,
    selected:Boolean
})

const Option = mongoose.model("Option",optionSchema);

module.exports = {Option}