const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Note = require("./models/backendNote");
const { validateAccessToken } = require("./middleware/auth0.middleware.js");
const { errorHandler } = require("./middleware/error.middleware.js");

app.use(cors());
app.use(express.static("dist"));

app.use(express.json());
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

let notes = [
  {
    name: "College",
    content: [
      {
        taskItem: "Finishing college applications",
        id: 1,
      },
      {
        taskItem: "Completing my homework",
        id: 2,
      },
      {
        taskItem: "Cleaning house",
        id: 3,
      },
      {
        taskItem: "Applying Scholarships",
        id: 4,
      },
    ],
    id: 1,
  },
  {
    name: "College",
    content: [
      {
        taskItem: "Finishing college applications",
        id: 1,
      },
    ],
    id: 2,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>The app is working</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => next(error));
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/notes", validateAccessToken, (request, response) => {
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

app.put("/api/notes/:id", (request, response) => {
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
