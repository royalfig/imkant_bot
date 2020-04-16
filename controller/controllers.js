// Ghost Admin API
require("dotenv").config();
const apiKey = process.env.GHOST;
const GhostAdminAPI = require("@tryghost/admin-api");
const api = new GhostAdminAPI({
  url: "https://imkant.com",
  key:
    "5e8a31393d8dcc04f1e1918a:2dbc752fff4a2eb3cea79ee663bd546c015253ada54fa89f5b281d59654e0332",
  version: "v3",
});

const fs = require("fs");
const path = require("path");

const { getRss, getAndParseMetaTags } = require("../utils/parser");
const Article = require("../models/models");
const config = require("../utils/configs");

const getPostsFromGhost = async () =>
  await api.posts.browse({ limit: "all" }).catch((err) => console.log(err));

const getPostTitles = async () => {
  const data = await getPostsFromGhost();
  if (data.meta.pagination.total) {
    const postArray = data.map((post) => post.title);
    return postArray;
  }
  return ["No posts!"];
};

const deletePosts = async (input) => {
  const filterDataForDrafts = (postArr) => {
    const filteredData = postArr.filter((post) => post.status === "draft");
    return filteredData;
  };
  try {
    const data = await getPostsFromGhost();
    let filteredData = input === "drafts" ? filterDataForDrafts(data) : data;
    if (data.meta.pagination.total) {
      const promises = await filteredData.map(async (post) => {
        return (deletedPost = await api.posts
          .delete({ id: post.id })
          .then(() => post.title)
          .catch((e) => e));
      });

      const deletedPosts = await Promise.all(promises);
      return deletedPosts;
    } else {
      return ["No posts to delete!"];
    }
  } catch (err) {
    console.log(err);
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const postToGhost = async (config) => {
  const existingPostTitles = await getPostTitles();
  const urls = await getRss(config);
  const promises = urls.map(async (url) => {
    const metadataObj = await getAndParseMetaTags(url, config);
    return metadataObj;
  });
  const metadataObjArr = await Promise.all(promises);
  const ghostPosts = metadataObjArr.map(
    (item) => new Article(item, config.color)
  );

  // Post to ghost db
  const dedupedArr = ghostPosts.filter(
    (item) => !existingPostTitles.includes(item.shortTitle)
  );

  dedupedArr.map((item) => {
    api.posts
      .add(item.ghostModel)
      .then((res) => res.title)
      .then(() => sleep(1000))
      .catch((e) => console.log(e));
  });

  // Log fetched models
  const date = Date.now();

  const filename = `log-${date}.json`;

  fs.writeFileSync(
    path.join(process.cwd(), "logs", filename),
    JSON.stringify(dedupedArr),
    (err) => {
      console.log(err);
    }
  );
  return dedupedArr;
};
postToGhost(config.source.studies_in_history_and_philosophy_of_science_part_a);
exports.getPostsFromGhost = getPostsFromGhost;
exports.getPostTitles = getPostTitles;
exports.deletePosts = deletePosts;
exports.postToGhost = postToGhost;
