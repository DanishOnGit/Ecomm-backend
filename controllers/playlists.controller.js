const {Playlist} = require("../models/playlist.model");
const { extend } = require("lodash");

const getPlaylistByIdFromDb = async (req, res, next, id) => {
    try {
      const playlistFromDb = await Playlist.findById(id);
      if (playlistFromDb) {
        req.playlistFromDb = playlistFromDb;
        next();
      } else {
        res.status(404).json({ success: false, message: "Playlist not found" });
      }
    } catch (err) {
      console.log(err)
      res.status(404).json({
        success: false,
        message: "Something went wrong",
        errorMessage: error.message,
      });
    }
  }

  const addNewPlaylist = async (req, res) => {
    try {
      const playlistData = req.body;
      const NewPlaylist = new Playlist(playlistData);
      const createdPlaylist = await NewPlaylist.save();
      res.status(201).json({
        success: true,
        message: "Playlist created successfully.",
        playlist: createdPlaylist,
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: "Request failed please check errorMessage key for more details",
        errorMessage: err.message,
      });
    }
  }

  const updatePlaylistDetails = async (req, res) => {
    try {
      const playlistsUpdates = req.body;
      let { playlistFromDb } = req;
      playlistFromDb = extend(playlistFromDb, playlistsUpdates);
      playlistFromDb = await playlistFromDb.save();
      const updatedPlaylist = await playlistFromDb
        .populate("listVideos.videoId")
        .execPopulate();
      res.status(200).json({ success: true, playlist: updatedPlaylist });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message:
          "Request failed please check errorMessage key for more details",
        errorMessage: err.message,
      });
    }
  }

  const addVideoToPlaylist = async (req, res) => {
    try {
      const videoDetails = req.body;
      let { playlistFromDb } = req;
  
      if (
        playlistFromDb.listVideos.find(
          (item) => item.videoId == videoDetails.videoId
        )
      ) {
        playlistFromDb.listVideos = playlistFromDb.listVideos.filter(
          (item) => item.videoId !== videoDetails.videoId
        );
      } else {
        playlistFromDb.listVideos.push({
          videoId: videoDetails.videoId,
          addedAt: new Date().toDateString(),
        });
      }
  
      const savedItem = await playlistFromDb.save();
      const updatedPlaylist = await savedItem
        .populate("listVideos.videoId")
        .execPopulate();
      res.status(201).json({ success: true, playlist: updatedPlaylist });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Request failed please check errorMessage key for more details",
        errorMessage: err.message,
      });
    }
  }

  const deletePlaylist = async (req, res) => {
    try {
      let { playlistFromDb } = req;
      await playlistFromDb.remove();
      res.status(200).json({ success: true, playlist: playlistFromDb });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message:
          "Request failed please check errorMessage key for more details",
        errorMessage: err.message,
      });
    }
  }

  module.exports = {getPlaylistByIdFromDb,addNewPlaylist,updatePlaylistDetails,deletePlaylist,addVideoToPlaylist}