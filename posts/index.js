const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");

  posts[id] = {
    id,
    title,
  };

  console.log(req.body);

  axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event: ", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
