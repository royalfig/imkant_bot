const { getMetadata, metadataRuleSets } = require("page-metadata-parser");
const domino = require("domino");
const axios = require("axios").default;

// RSS
let Parser = require("rss-parser");
let parser = new Parser();

// Metadata Parser

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

// Add a custom rule
const addCustomRule = (key, keyContent, property, name) => {
  const meta = "meta[" + key + "=" + '"' + keyContent + '"]';
  const rule = {
    rules: [[meta, (element) => element.getAttribute(property)]],
  };
  metadataRuleSets[name] = rule;
};

// Custom rules
// addCustomRule("name", "citation_keywords", "content", "keyword");
// addCustomRule("name", "citation_author", "content", "author");
// addCustomRule("name", "citation_journal_title", "content", "journalTitle");
// addCustomRule("name", "citation_firstpage", "content", "firstpage");
// addCustomRule("name", "citation_lastpage", "content", "lastpage");
// addCustomRule("name", "citation_volume", "content", "volume");
// addCustomRule("name", "citation_issue", "content", "issue");
// addCustomRule("name", "citation_title", "content", "title");

// Add date set
// const customDateRuleSet = {
//   rules: [
//     [
//       'meta[name="citation_publication_date"]',
//       (element) => element.getAttribute("content"),
//     ],
//     [
//       'meta[property="article:published_time"]',
//       (element) => element.getAttribute("content"),
//     ],
//   ],
// };
// metadataRuleSets.date = customDateRuleSet;

// Add DOI set
// const customDOIRuleSet = {
//   rules: [
//     ['meta[name="citation_doi"]', (element) => element.getAttribute("content")],
//     [
//       'meta[property="dc.identifier"]',
//       (element) => element.getAttribute("content"),
//     ],
//   ],
// };
// metadataRuleSets.doi = customDOIRuleSet;

// Extend Description (abstract)
// const customAbstractRuleSet = {
//   rules: [
//     [
//       'meta[property="og:description"]',
//       (element) => element.getAttribute("content"),
//     ],
//     [
//       'meta[name="citation_abstract"]',
//       (element) => element.getAttribute("content"),
//     ],
//     ['meta[name="description"]', (element) => element.getAttribute("content")],
//   ],
// };
// metadataRuleSets.abstract = customAbstractRuleSet;

// Extend Keywords
// const customKeywordRuleSet = {
//   rules: [
//     [
//       'meta[name="citation_keywords"]',
//       (element) => element.getAttribute("content"),
//     ],
//     ['meta[name="keywords"]', (element) => element.getAttribute("content")],
//   ],
// };
// metadataRuleSets.customKeywords = customKeywordRuleSet;

const getRss = async (config) => {
  const url = config.url;
  const filterForKantArticles = config.filter;
  const { items } = await parser.parseURL(url);
  const feedWithoutExtraneousMaterials = filterOutFrontMatter(items);
  const filteredFeed = filterForKantArticles
    ? filterForKant(feedWithoutExtraneousMaterials)
    : feedWithoutExtraneousMaterials;
  const rssUrls = filteredFeed.map((item) => item.link);
  console.log(rssUrls);
  return rssUrls;
};

const scrapePages = async (rssURL, config) => {
  // Build ruleset
  //
  //
  try {
    const promises = urlArray.map(async (item) => {
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

const getArticleTags = (doc) => {
  const tags = doc.querySelectorAll('meta[property="article:tag"]');

  const arr = tags.map((tag) => tag.getAttribute("content"));
  if (arr.length) {
    return arr;
  }
  return null;
};

const filterForKant = (postArray) => {
  const regex = RegExp(/Kant/i);
  const results = postArray.filter((post) => regex.test(post.title));
  return results;
};

const filterOutFrontMatter = (postArray) => {
  const regex = RegExp(/Titelseiten|Front Matter|Back Matter/i);
  const results = postArray.filter((post) => !regex.test(post.title));
  return results;
};

const stripMarkUp = (input) => {
  return input.replace(/<.+?>/g, "").replace(/Abstract/, "");
};

exports.getArticleTags = getArticleTags;
exports.addCustomRule = addCustomRule;
exports.getRss = getRss;
exports.stripMarkUp = stripMarkUp;
