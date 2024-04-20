const boardsRouter = require("express").Router();
const Board = require("../models/board");
const User = require("../models/user");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

boardsRouter.get("/", validateAccessToken, async (req, res) => {
  const boards = await Board.find({}).populate("notes", {});

  res.json(boards);
});

boardsRouter.post("/", validateAccessToken, async (req, res) => {
  const body = req.body;
  const username = request.auth.payload.sub;

  const user = await User.findOne({ userName: username });

  if (body.boardName === undefined) {
    return res.status(400).json({ error: "board name missing" });
  }

  const board = new Board({
    boardName: body.boardName,
    themeType: body.themeType,
    user: user.id,
  });

  const savedBoard = await board.save();
  user.boards = user.boards.concat(savedBoard._id);
  await user.save();
  res.status(201).json(savedBoard);
});

boardsRouter.delete("/:id", validateAccessToken, async (req, res) => {
  try {
    await Board.findByIdAndRemove(req.params.id);
    res.json("Removed Successfully");
  } catch (err) {
    res.json(err);
  }
});

module.exports = boardsRouter;
