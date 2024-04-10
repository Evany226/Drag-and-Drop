const usersRouter = require("express").Router();
const User = require("../models/user");

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

usersRouter.post("/", async (request, response) => {
  const { username } = request.body;

  const user = new User({
    userName: username,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
