const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://trello:${password}@dragndrop.gcwtukj.mongodb.net/trelloApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  content: Array,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  name: "Evan Yang",
  content: [
    {
      taskItem: "Finishing college applications",
      id: 1,
    },
  ],
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
