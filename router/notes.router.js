const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { Note } = require("../models/note.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const userId = req.get("userId");
      const videoId = req.get("videoId");

      const notesFromDb = await Note.find({ userId: userId, videoId: videoId });
      res.status(200).json({ success: true, notes: notesFromDb });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const noteData = req.body;
      const NewNote = new Note(noteData);
      const savedNote = await NewNote.save();
      res.status(201).json({ success: true, note: savedNote });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  });

router.param("noteId", async (req, res, next, id) => {
  try {
    const noteFromDb = await Note.findById(id);
    if (!noteFromDb) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    req.noteFromDb = noteFromDb;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      errMessage: err.message,
    });
  }
});

router
  .route("/:noteId")
  .post(async (req, res) => {
    try {
      let { noteFromDb } = req;
      const updatedNoteDetails = req.body;
      noteFromDb = extend(noteFromDb, updatedNoteDetails);
      noteFromDb = await noteFromDb.save();
      res.status(200).json({ success: true, note: noteFromDb });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      let { noteFromDb } = req;
      await noteFromDb.remove();
      res.status(200).json({ success: true, note: noteFromDb });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  });

module.exports = router;
