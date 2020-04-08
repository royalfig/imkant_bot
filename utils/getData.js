//make the call and get the data ready
require("dotenv").config();
const apiKey = process.env.GHOST;
const GhostAdminAPI = require("@tryghost/admin-api");
const api = new GhostAdminAPI({
  url: "https://imkant.com",
  key:
    "5e8a31393d8dcc04f1e1918a:2dbc752fff4a2eb3cea79ee663bd546c015253ada54fa89f5b281d59654e0332",
  version: "v3"
});
// RSS
let Parser = require("rss-parser");
let parser = new Parser();

/* Default metadata 
__Field	Description__
description:	A user displayable description for the page.
icon:	A URL which contains an icon for the page.
image:	A URL which contains a preview image for the page.
keywords:	The meta keywords for the page.
provider:	A string representation of the sub and primary domains.
title:	A user displayable title for the page.
type:	The type of content as defined by opengraph.
url:	A canonical URL for the page.


//Extend....
image
https://static.cambridge.org/covers/KRV_0_0_0/kantian_review.jpg
title
keywords
<meta name="citation_keywords" content="Kant; welfare; rights; left-libertarianism">
<meta content="Critique of Pure Reason" property="article:tag">
//Add....
author
<meta name="citation_author" content="Luke J. Davies">

journal title
<meta name="citation_journal_title" content="Kantian Review">
volume
<meta name="citation_volume" content="25">

issue
<meta name="citation_issue" content="1">
first page
<meta name="citation_firstpage" content="1">
last page
<meta name="citation_lastpage" content="25">
abstract
extend description
<meta name="citation_abstract" content="<div class=&quot;abstract&quot; data-abstract-type=&quot;normal&quot;><p>This article discusses five attempts at justifying the provision of welfare on Kantian grounds. I argue that none of the five proposals is satisfactory. Each faces a serious challenge on textual or systematic grounds. The conclusion to draw from this is not that a Kantian cannot defend the provision of welfare. Rather, the conclusion to draw is that the task of defending the provision of welfare on Kantian grounds is a difficult one whose success we should not take for granted.</p></div>">
date
<meta name="citation_publication_date" content="2020/03">
doi
<meta name="citation_doi" content="10.1017/S136941541900044X">
<meta name="dc.identifier" content="doi:10.1017/S136941541900044X">
*/
// Metadata
const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");
const axios = require("axios").default;

const getRss = async url => {
  let feed = await parser.parseURL(url);
  return feed;
};

exports.getData = async url => {
  const feed = await getRss(url);
  const linkArray = feed.items.map(item => item.link);

  const promises = linkArray.map(async item => {
    const { data } = await axios.get(item);
    const doc = domino.createWindow(data).document;
    const metadata = getMetadata(doc, url);
    return metadata;
  });
  const dataArray = await Promise.all(promises);
  return dataArray;
};

exports.getPosts = async () => {
  const posts = await api.posts.browse();
  if (posts.meta.pagination.total) {
    const postArray = [];
    posts.forEach(post => postArray.push(post.title));
    return postArray;
  } else {
    return ["No posts!"];
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
    return ["No draft posts to delete!"];
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
    return ["No posts to delete!"];
  }
};

exports.postToGhost = async newPost => {
  try {
    const posts = await api.posts.browse();
    const existingPosts = posts.map(post => post.title);
    const duplicate = existingPosts.include(newPost.title);
    if (!duplicate) {
      api.posts
        .add(ghostPost)
        .then(() => `Successfully posted ${ghostPost.title}`)
        .catch(err => `There was an error with ${ghostPost.title}: ${err}`);
    } else {
      return `Not posted. ${ghostPost.title} is a duplicate.`;
    }
  } catch (err) {
    console.log(err);
  }
};
