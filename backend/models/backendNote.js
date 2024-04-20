const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: String,
  content: Array,
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
