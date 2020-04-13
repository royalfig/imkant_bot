// Ghost Admin API
require("dotenv").config();
const apiKey = process.env.GHOST;
const GhostAdminAPI = require("@tryghost/admin-api");
const api = new GhostAdminAPI({
  url: "https://imkant.com",
  key: apiKey,
  version: "v3",
});

const fs = require("fs");
const path = require("path");

const { getRss, scrapePages } = require("../utils/parser");
const Article = require("../models/models");

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

const postToGhost = async (source) => {
  const existingPostTitles = await getPostTitles();
  const rss = await getRss(source);
  const result = await scrapePages(rss, source);
  const arts = result.map((item) => new Article(item, source.color));

  // Log fetched models
  const date = `${
    new Date().getMonth() + 1
  }-${new Date().getDate()}-${new Date().getFullYear()}`;
  const filename = `log-${date}.txt`;
  arts.forEach((item, idx) => {
    fs.appendFileSync(
      path.join(process.cwd(), "logs", filename),
      "\n" + idx + ". " + item.ghostModel.title + "\n",
      (err) => {
        console.log(err);
      }
    );
  });

  // Post to ghost db
  const dedupedArr = arts.filter(
    (item) => !existingPostTitles.includes(item.title)
  );
  dedupedArr.map((item) => {
    api.posts
      .add(item.ghostModel)
      .then((res) => res.title)
      .catch((e) => console.log(e));
  });
  return dedupedArr;
};

exports.getPostsFromGhost = getPostsFromGhost;
exports.getPostTitles = getPostTitles;
exports.deletePosts = deletePosts;
exports.postToGhost = postToGhost;
