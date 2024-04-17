const boardsRouter = require("express").Router();
const Board = require("../models/board");
const User = require("../models/user");

boardsRouter.get("/", async (req, res) => {
  const boards = await Board.find({}).populate("notes", {});

  res.json(boards);
});

boardsRouter.post("/", async (req, res) => {
  const body = req.body;
  const username = "google-oauth2|103964861180742015983";

  const user = await User.findOne({ userName: username });

  if (body.boardName === undefined) {
    return res.status(400).json({ error: "board name missing" });
  }

  const board = new Board({
    boardName: body.boardName,
    user: user.id,
  });

  const savedBoard = await board.save();
  user.boards = user.boards.concat(savedBoard._id);
  await user.save();
  res.status(201).json(savedBoard);
});

boardsRouter.delete("/:id", async (req, res) => {
  try {
    await Board.findByIdAndRemove(req.params.id);
    res.json("Removed Successfully");
  } catch (err) {
    res.json(err);
  }
});

module.exports = boardsRouter;