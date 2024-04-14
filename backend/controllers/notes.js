const notesRouter = require("express").Router();
const Note = require("../models/backendNote");
const User = require("../models/user");
const Board = require("../models/board");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

notesRouter.get("/", validateAccessToken, async (request, response) => {
  const username = request.auth.payload.sub;

  const test = await User.findOne({ userName: username }).populate({
    path: "boards",
    populate: {
      path: "notes",
      model: "Note",
    },
  });

  response.json(test);
});

notesRouter.get("/:id", validateAccessToken, async (request, response) => {
  const note = await Note.findById(request.params.id);
  response.json(note);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.post("/:id", validateAccessToken, async (request, response) => {
  const body = request.body;

  const board = await Board.findById(request.params.id);

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const note = new Note({
    name: body.name,
    content: body.content || [],
    board: board.id,
  });

  const savedNote = await note.save();
  board.notes = board.notes.concat(savedNote._id);
  await board.save();
  response.status(201).json(savedNote);
});

notesRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const note = {
    name: body.name,
    content: body.content,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
  });

  response.json(updatedNote);
});

notesRouter.put("/", validateAccessToken, async (request, response) => {
  const body = request.body;
  const username = request.auth.payload.sub;

  const content = {
    ...body,
  };

  const array = [];

  const testing = body.map((item) => {
    array.push(item.id);
  });

  const updatedNote = await User.findOneAndUpdate(
    { userName: username },
    { notes: array },
    {
      new: true,
    }
  ).populate("notes", {
    name: 1,
    content: 1,
  });

  response.json(updatedNote.notes);
});

module.exports = notesRouter;
