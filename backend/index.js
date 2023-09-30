const express = require("express");
const app = express();

app.use(express.json());

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
  {
    name: "College",
    content: [
      {
        taskItem: "Testing new experiment",
        id: 1,
      },
      {
        taskItem: "Steven",
        id: 2,
      },
    ],
    id: 3,
  },
  {
    name: "Evan",
    content: [
      {
        taskItem: "Yo",
        id: 1,
      },
    ],
    id: 4,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>The app is working</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  response.json(note);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    name: body.name,
    content: body.content || [],
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
