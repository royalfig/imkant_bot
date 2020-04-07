// Node
const fs = require("fs");
const path = require("path");
const { getPosts, deletePublished, sayMyName } = require("./utils/getData");

// Libs

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/delete", (req, res) => {
  deletePublished().then(postArray => {
    res.send(postArray);
  });
});

app.get("/posts", (req, res) => {
  getPosts().then(postArray => res.send(postArray));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
