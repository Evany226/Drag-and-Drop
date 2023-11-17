const notesRouter = require("express").Router();
const Note = require("../models/backendNote");
const User = require("../models/user");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

notesRouter.get("/", validateAccessToken, async (request, response) => {
  const name = request.auth.payload.sub;

  const test = await User.findOne({ userName: name }).populate("notes", {
    name: 1,
    content: 1,
  });

  response.json(test.notes);
});

notesRouter.get("/:id", validateAccessToken, async (request, response) => {
  const note = await Note.findById(request.params.id);
  response.json(note);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.post("/", validateAccessToken, async (request, response) => {
  const body = request.body;
  const username = request.auth.payload.sub;

  const user = await User.findOne({ userName: username });

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const note = new Note({
    name: body.name,
    content: body.content || [],
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
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

module.exports = notesRouter;
