require("dotenv").config();
const apiKey = process.env.GHOST;
const getData = async (url, config) => {};

let Parser = require("rss-parser");
let parser = new Parser();
const GhostAdminAPI = require("@tryghost/admin-api");
const { getMetadata, metadataRuleSets } = require("page-metadata-parser");
const domino = require("domino");
const axios = require("axios").default;

const api = new GhostAdminAPI({
  url: "https://imkant.com",
  key: apiKey,
  version: "v3"
});

exports.getPosts = async () => {
  const posts = await api.posts.browse();
  if (posts.meta.pagination.total) {
    const postArray = [];
    posts.forEach(post => postArray.push(post.title));
    return postArray;
  } else {
    return ["No Posts!"];
  }
};

exports.deleteDrafts = async () => {
  const posts = await api.posts.browse();
  if (posts.meta.pagination.total) {
    const postArray = [];
    posts.forEach(post => {
      if (post.status === "draft") {
        postArray.push(post.title);
        api.posts.delete({ id: post.id });
      }
    });
    return postArray;
  } else {
    return ["No Posts!"];
  }
};

exports.deletePublished = async () => {
  const posts = await api.posts.browse();
  if (posts.meta.pagination.total) {
    const postArray = [];
    posts.forEach(post => {
      postArray.push(post.title);
      api.posts.delete({ id: post.id });
    });
    return postArray;
  } else {
    return ["No Posts!"];
  }
};

exports.sayMyName = input => {
  return "Hi, " + input;
};
