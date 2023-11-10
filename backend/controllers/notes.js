const notesRouter = require("express").Router();
const Note = require("../models/backendNote");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

notesRouter.get("/", (request, response) => {
  // console.log(request.auth.payload.sub);
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => next(error));
});

notesRouter.get("/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

notesRouter.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const note = new Note({
    name: body.name,
    content: body.content || [],
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

notesRouter.put("/:id", (request, response) => {
  const body = request.body;

  const note = {
    name: body.name,
    content: body.content,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
