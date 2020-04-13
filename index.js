// Node
const {
  deletePosts,
  getPostTitles,
  postToGhost,
} = require("./controller/controllers");
const { config } = require("./utils/configs");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

app.post("/delete/:status", (req, res) => {
  const { status } = req.params;
  try {
    deletePosts(status).then((deletedPosts) => res.send(deletedPosts));
  } catch (e) {
    res.send(e);
  }
});

app.get("/posts", (req, res) => {
  getPostTitles()
    .then((postArray) => res.send(postArray))
    .catch((e) => res.send(e));
});

app.get("/bot/:source", (req, res) => {
  const { source } = req.params;
  console.log(config[source]);
  postToGhost(config[source])
    .then((arr) => res.send(arr))
    .catch((e) => res.send(e));
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
