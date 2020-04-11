const { getPostsFromGhost, getPostTitles, testPost } = require("./getData");

const test = {
  title: "My test post",
  status: "published"
};

const test2 = {
  title: "test2",
  status: "published"
};

testPost(test);
testPost(test2);
