const checkAuthentication = async (req, res) => {
  try {
    const email = req.get("email");
    const password = req.get("password");

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(401).json({ success: false, message: "Email not exists!" });
    } else if (user.password === password) {
      return res
        .status(200)
        .json({ success: true, name: user.name, userId: user._id });
    }
    res.status(401).json({ success: false, message: "Password is incorrect" });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message:
          "Request failed please check errorMessage key for more details",
        errorMessage: err.message,
      });
  }
};

module.exports = checkAuthentication;
