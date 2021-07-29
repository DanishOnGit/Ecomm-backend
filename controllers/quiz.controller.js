
const createNewQuiz=async(req,res)=>{
try{
    const quizDetails = req.body
  const NewQuiz = new Quiz(quizDetails)
  await NewQuiz.save();
}catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Unable to add quiz.Check errorMessage for more details",
      errorMessage: error.message,
    });
}
}