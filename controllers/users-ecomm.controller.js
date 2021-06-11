const { EcommUser } = require("../models/users-ecomm.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mySecret = process.env.JWT_KEY;

const addNewUser = async (req,res)=>{
try{

    const userDetails = req.body;
    const result = await EcommUser.findOne({email:userDetails.email});
    if(result){
        res.status(409).json({
            success: false,
            message: "User Already exists with this email id. ",
          });
          return;
    }
    const NewUser = new EcommUser(userDetails);
    const salt = await bcrypt.genSalt(10);
    NewUser.password = await bcrypt.hash(NewUser.password, salt);
    const createdUser = await NewUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully." });

}catch(err){
    console.log(err)
    res.status(500).json({success:false,message:"Error creating user !"})
}
}

const checkUserAuthentication = async(req,res)=>{
    try{
        const email = req.get("email");
        const password = req.get("password");
        
        const user = await EcommUser.findOne({email:email});
        if (!user) {
            return res
              .status(401)
              .json({ success: false, message: "Email not exists!" });
          }
          const validPassword = await bcrypt.compare(password, user.password);
      
          if (validPassword) {
            const token = jwt.sign({ userId: user._id }, mySecret, {
              expiresIn: "24h",
            });
            return res.status(200).json({
              success: true,
              token: token,
              userId: user._id,
            });
          }
          res.status(401).json({ success: false, message: "Password is incorrect" });

    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Request failed please check errorMessage key for more details",
            userDetails: { email: email, password: password },
            errorMessage: err.message,
          });
    }
}


module.exports = {addNewUser,checkUserAuthentication}