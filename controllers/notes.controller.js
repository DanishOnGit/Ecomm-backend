const { Note } = require("../models/note.model");
const { extend } = require("lodash");

const getNotesByUserIdAndVideoId = async (req, res) => {
  try {
    // const userId = req.get("userId");
    const {userId} = req
    const videoId = req.get("videoId");
    const notesFromDb = await Note.find({ userId, videoId: videoId });
    res.status(200).json({ success: true, notes: notesFromDb });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      errMessage: err.message,
    });
  }
};

const addNewNote = async (req, res) => {
  try {
    const {userId}=req
    const noteData = req.body;
    const NewNote = new Note({...noteData,userId});
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
};

const getNoteByIdFromDb = async (req, res, next, id) => {
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
};

const updateNote = async (req, res) => {
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
};

const deleteNote = async (req, res) => {
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
};

module.exports = {
  getNotesByUserIdAndVideoId,
  addNewNote,
  getNoteByIdFromDb,
  updateNote,
  deleteNote,
};
