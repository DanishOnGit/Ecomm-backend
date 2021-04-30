function errorHandler(err, req, res, next) {
  console.log(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: " Error Occured. Please try again !",
      errMessage: err.message,
    });
}
module.exports = errorHandler;
