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
*/

// Metadata
const { getMetadata, metadataRuleSets } = require("page-metadata-parser");
const domino = require("domino");
const axios = require("axios").default;

// Add a custom rule
const addCustomRule = (key, keyContent, property, name) => {
  const meta = "meta[" + key + "=" + '"' + keyContent + '"]';
  const rule = {
    rules: [[meta, element => element.getAttribute(property)]]
  };
  metadataRuleSets[name] = rule;
};

// Custom rules

addCustomRule("name", "citation_keywords", "content", "keyword");
addCustomRule("name", "citation_author", "content", "author");
addCustomRule("name", "citation_journal_title", "content", "journalTitle");
addCustomRule("name", "citation_firstpage", "content", "firstpage");
addCustomRule("name", "citation_lastpage", "content", "lastpage");
addCustomRule("name", "citation_volume", "content", "volume");
addCustomRule("name", "citation_issue", "content", "issue");
addCustomRule("name", "citation_title", "content", "title");

// Add date set
const customDateRuleSet = {
  rules: [
    [
      'meta[name="citation_publication_date"]',
      element => element.getAttribute("content")
    ],
    [
      'meta[property="article:published_time"]',
      element => element.getAttribute("content")
    ]
  ]
};
metadataRuleSets.date = customDateRuleSet;

// Add DOI set
const customDOIRuleSet = {
  rules: [
    ['meta[name="citation_doi"]', element => element.getAttribute("content")],
    [
      'meta[property="dc.identifier"]',
      element => element.getAttribute("content")
    ]
  ]
};
metadataRuleSets.doi = customDOIRuleSet;

// Extend Description (abstract)

const customAbstractRuleSet = {
  rules: [
    [
      'meta[property="og:description"]',
      element => element.getAttribute("content")
    ],
    [
      'meta[name="citation_abstract"]',
      element => element.getAttribute("content")
    ],
    ['meta[name="description"]', element => element.getAttribute("content")]
  ]
};
metadataRuleSets.abstract = customAbstractRuleSet;

// Extend Keywords
const customKeywordRuleSet = {
  rules: [
    [
      'meta[name="citation_keywords"]',
      element => element.getAttribute("content")
    ],
    ['meta[name="keywords"]', element => element.getAttribute("content")]
  ]
};
metadataRuleSets.customKeywords = customKeywordRuleSet;

const getRss = async url => {
  let feed = await parser.parseURL(url);
  return feed;
};

const getArticleTags = doc => {
  const tags = doc.querySelectorAll('meta[property="article:tag"]');

  const arr = tags.map(tag => tag.getAttribute("content"));
  if (arr.length) {
    return arr;
  }
  return null;
};

exports.getData = async url => {
  try {
    const feed = await getRss(url);
    const linkArray = feed.items.map(item => item.link);

    const promises = linkArray.map(async item => {
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
    posts.forEach(async post => {
      if (post.status === "draft") {
        postArray.push(post.title);
        await api.posts.delete({ id: post.id }).catch(err => console.log(err));
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

exports.postToGhost = async ghostPost => {
  try {
    const postData = await api.posts.browse();
    if (postData.meta.pagination.total) {
      const existingPosts = postData.map(post => post.title);
      const duplicate = existingPosts.includes(ghostPost.title);
      if (!duplicate) {
        api.posts
          .add(ghostPost)
          .then(() => `Successfully posted ${ghostPost.title}`)
          .catch(err => `There was an error with ${ghostPost.title}: ${err}`);
      } else {
        console.log(`Not posted. ${ghostPost.title} is a duplicate.`);
        return;
      }
    }
    api.posts
      .add(ghostPost)
      .then(() => `Successfully posted ${ghostPost.title}`)
      .catch(err => `There was an error with ${ghostPost.title}: ${err}`);
  } catch (err) {
    console.log(err);
  }
};
