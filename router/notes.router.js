const express = require("express");
const router = express.Router();

const {
  getNotesByUserIdAndVideoId,
  addNewNote,
  getNoteByIdFromDb,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

router.route("/").get(getNotesByUserIdAndVideoId).post(addNewNote);

router.param("noteId", getNoteByIdFromDb);

router.route("/:noteId").post(updateNote).delete(deleteNote);

module.exports = router;
