// Node
const {
  deletePosts,
  getPostTitles,
  postToGhost,
  getPostsFromGhost,
  getAllPostsFromGhost,
  getPostFromGhostByPage,
  getSources
} = require("./controller/controllers");
const { getSingleUrl } = require("./utils/parser");
const config = require("./utils/configs");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

app.post("/delete/:status", (req, res) => {
  const { status } = req.params;
  try {
    deletePosts(status).then(deletedPosts => res.send(deletedPosts));
  } catch (e) {
    res.send(e);
  }
});

app.get("/posts", (req, res) => {
  getPostsFromGhost()
    .then(data => {
      const obj = { data: data, meta: data.meta };
      res.send(obj);
    })
    .catch(e => res.send(e));
});

app.get("/all-posts", (req, res) => {
  getAllPostsFromGhost()
    .then(data => {
      const obj = { posts: data, meta: data.meta };
      res.send(obj);
    })
    .catch(e => res.send(e));
});

app.get("/page/:page", (req, res) => {
  const { page } = req.params;
  getPostFromGhostByPage(page).then(data => {
    const obj = { data: data, meta: data.meta };
    res.send(obj);
  });
});

app.get("/bot/:source", (req, res) => {
  const { source } = req.params;
  postToGhost(config[source])
    .then(arr => res.send(arr))
    .catch(e => res.send(e));
});

app.get("/sources", (req, res) => {
  const sources = getSources(config);
  res.send(sources);
});

app.get("/scrape/:url", (req, res) => {
  console.log(req.params);
  const { url } = req.params;

  getSingleUrl(url)
    .then(results => res.send(results))
    .catch(e => res.send(e));
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
