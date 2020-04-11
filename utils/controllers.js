// Ghost Admin API
require("dotenv").config();
const apiKey = process.env.GHOST;
const GhostAdminAPI = require("@tryghost/admin-api");
const api = new GhostAdminAPI({
  url: "https://imkant.com",
  key: apiKey,
  version: "v3",
});

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

const getData = async (url) => {
  try {
    const feed = await getRss(url);
    const linkArray = feed.items.map((item) => item.link);

    const promises = linkArray.map(async (item) => {
      const { data } = await axios.get(item);
      const doc = domino.createWindow(data).document;
      const articleTags = getArticleTags(doc);
      const metadata = getMetadata(doc, url);
      metadata.tags = articleTags;
      return metadata;
    });
    const dataArray = await Promise.all(promises);
    return dataArray;
  } catch (err) {
    console.log(err, err.context);
  }
};

const deletePosts = async (input) => {
  try {
    const filterDataForDrafts(arrayOfPosts) {
      const draftPosts = arrayOfPosts.filter(post => post.status === "draft");
      return draftPosts;
    } 
    const data = await getPostsFromGhost();
    let filteredData = input === 'drafts' ? filterDataForDrafts(data): data;

    if (data.meta.pagination.total) {
      const promises = await filteredData.map(async post => {
          const deletedPost = await api.posts
            .delete({ id: post.id })
            .then((res) => res.title)
            .catch((err) => err);
          return deletedPost;
      });

      const deletedPosts = await Promise.all(promises);

      return deletedPosts;
    } else {
      return ["No draft posts to delete!"];
    }
  } catch (err) {
    console.log(err);
  }
};

const postToGhost = async (ghostPost) => {
  try {
    if (posts.meta.pagination.total) {
      const existingPosts = getPostsFromGhost.map((post) => post.title);
      const duplicate = existingPosts.includes(ghostPost.title);
      if (!duplicate) {
        api.posts
          .add(ghostPost)
          .then(() => `Successfully posted ${ghostPost.title}`)
          .catch((err) => `There was an error with ${ghostPost.title}: ${err}`);
      } else {
        return `Not posted. ${ghostPost.title} is a duplicate.`;
      }
    }
  } catch (err) {
    return `There was an error with ${ghostPost.title}: ${err}`;
  }
};

exports.getPostsFromGhost = getPostsFromGhost;
exports.getPostTitles = getPostTitles;
exports.getData = getData;
exports.deletePosts = deletePosts;
exports.postToGhost = postToGhost;
