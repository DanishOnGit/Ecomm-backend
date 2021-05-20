const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model");

const videos = [
  {
    _id: "v=MsHMCZlcrXM",
    videoTitle: "Basic badminton for beginners - PART 1 OF 3",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi_webp/MsHMCZlcrXM/sddefault.webp",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=Oh4PELO1usA",
    videoTitle: "Basic badminton for beginners - PART 2 OF 3",
    channelName: "Shuttle Life",
    level: "Intermediate",
    thumbnail: "https://i.ytimg.com/vi/Oh4PELO1usA/sddefault.jpg",
    avatar:
      "https://yt3.ggpht.com/ytc/AAUvwnhyoBCEiGA6H10CO8lACRT-HZ8RRhUsAChl9rPrwg=s68-c-k-c0x00ffffff-no-rj",
  },
  {
    _id: "v=gpmPmRxbynk",
    videoTitle: "Basic badminton for beginners - PART 3 OF 3",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/gpmPmRxbynk/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=IidZFd6vCJk",
    videoTitle: "Badminton: Basic FOOTWORK - 6 corners",
    channelName: "Shuttle Life",
    level: "Intermediate",
    thumbnail: "https://i.ytimg.com/vi/IidZFd6vCJk/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=pB8dX6InWyM",
    videoTitle: "Rear/Back court , basic footwork ",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/pB8dX6InWyM/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=cP6f2zY8ma4",
    videoTitle: "FOOTWORK #12 - Basic back/forehand",
    channelName: "Shuttle Life",
    level: "Advanced",
    thumbnail: "https://i.ytimg.com/vi/cP6f2zY8ma4/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=DMgEYEFeb5Y",
    videoTitle: "Forehand slice to forehand corner",
    channelName: "Shuttle Life",
    level: "Advanced",
    thumbnail: "https://i.ytimg.com/vi/DMgEYEFeb5Y/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=j-DM_YJ5qfI",
    videoTitle: "Single Defence, directional changes",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/cP6f2zY8ma4/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=iBm5uUY0tTs",
    videoTitle: "Attck from back hand side",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/iBm5uUY0tTs/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=AH8rFC5wQzk",
    videoTitle: "Flat game, Full Court",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/AH8rFC5wQzk/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=Z0Xlar2L39M",
    videoTitle: "Forehand net drop",
    channelName: "Shuttle Life",
    level: "Intermediate",
    thumbnail: "https://i.ytimg.com/vi/Z0Xlar2L39M/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=Z0Xlar2L39M",
    videoTitle: "Straight forward drop shot",
    channelName: "Shuttle Life",
    level: "Advanced",
    thumbnail: "https://i.ytimg.com/vi/Z0Xlar2L39M/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=BxHY39Th0LI",
    videoTitle: "Speed at Home - 10 Exercises",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/BxHY39Th0LI/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=5UIIjB4Qg9Y",
    videoTitle: "Deceptive Trick Shots",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/5UIIjB4Qg9Y/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=MsHMCZlcrXM",
    videoTitle: "BASIC BADMINTON FOR BEGINNERS - PART 1 OF 3",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/MsHMCZlcrXM/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=MsHMCZlcrXM",
    videoTitle: "BASIC BADMINTON FOR BEGINNERS - PART 1 OF 3",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/MsHMCZlcrXM/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=MsHMCZlcrXM",
    videoTitle: "BASIC BADMINTON FOR BEGINNERS - PART 1 OF 3",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/MsHMCZlcrXM/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=MsHMCZlcrXM",
    videoTitle: "BASIC BADMINTON FOR BEGINNERS - PART 1 OF 3",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/BxHY39Th0LI/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=MsHMCZlcrXM",
    videoTitle: "BASIC BADMINTON FOR BEGINNERS - PART 1 OF 3",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/pB8dX6InWyM/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
  {
    _id: "v=MsHMCZlcrXM",
    videoTitle: "BASIC BADMINTON FOR BEGINNERS - PART 1 OF 3",
    channelName: "Shuttle Life",
    level: "Beginner",
    thumbnail: "https://i.ytimg.com/vi/Z0Xlar2L39M/sddefault.jpg",
    avatar:
      "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg",
  },
];

router
  .route("/")
  .get(async (req, res) => {
    try {
      const videos = await Video.find({});
      res.status(200).json({ success: true, videos });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Couldnt fetch request, try again !",
        errMsg: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      let NewVideo = await Video.insertMany(videos);

      res.json({ success: true, NewVideo });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Unable to add video!",
        errMessage: err.message,
      });
    }
  });

router.param("videoId", async (req, res, next, id) => {
  try {
    const video = await Video.findById({ _id: id });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "No video found associated, please check the video id!",
      });
    }
    req.video = video;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "No video found associated, please check the video id!",
      errMessage: err.message,
    });
  }
});

router.route("/:videoId").get(async (req, res) => {
  try {
    const { video } = req;
    video.__v = undefined;
    return res.json({ success: true, video });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not fetch the desired video!",
      errMessage: err.message,
    });
  }
});

module.exports = router;
