const usersRouter = require("express").Router();
const User = require("../models/user");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate({
    path: "boards",
    populate: {
      path: "notes",
      model: "Note",
    },
  });

  response.json(users);
});

usersRouter.post("/", validateAccessToken, async (request, response) => {
  const { username } = request.body;

  const user = new User({
    userName: username,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
