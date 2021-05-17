const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const videos = await Video.find({});
      res.status(200).json({ success: true, videos });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Couldnt fetch request, try again !",
          errMsg: err.message,
        });
    }
  })
  .post(async (req, res) => {
    try {
      const video = req.body;
      let NewVideo = await Video.insertMany(video);

      res.json({ success: true, NewVideo });
    } catch (err) {
      console.log(err.stack);
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to add video!",
          errMessage: err.message,
        });
    }
  });

// router.params("videoId",async (req, res, next, id)=>{
// try{
//  const video = await Video.findById({_id:id})
//   console.log("video is,",video)
//   if(!video){
//     return res.status(404).json({success:false,message: "No video found associated, please check the video id!"})
//   }
//   req.video = video
//   next()

// }catch (err) {
//     res.status(500).json({ success: false, message: "No video found associated, please check the video id!", errMessage: err.message })
//   }

// })

// router.route("/:videoId")
// .get(async (req,res)=>{
//   try{
//     const {video} = req
//     video.__v = undefined;
//     return res.json({ success: true, video })
//   }
//   catch(err){
//        res.status(500).json({ success: false, message: "Could not fetch the desired video!", errMessage: err.message })
//   }
// })

module.exports = router;
