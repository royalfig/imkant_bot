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

const setRuleToMetadata = (config, doc, url, color) => {
  const entries = Object.getOwnPropertyNames(config);

  entries.forEach((entry) => {
    if (config[entry].customRule === "custom") {
      const dataArr = config[entry].value;
      addCustomRule(dataArr[0], dataArr[1], dataArr[2], dataArr[3]);
    }
  });

  const metadata = getMetadata(doc, url);

  entries.forEach((entry) => {
    if (config[entry].customRule === "tags") {
      const result = config[entry].value(doc);
      metadata.keywords = result;
    }

    if (config[entry].customRule === "image") {
      const result = config[entry].value(color);
      metadata.image = result;
    }
  });

  return metadata;
};

const getRss = async (config) => {
  const url = config.url;
  const filterForKantArticles = config.filter;
  const { items } = await parser.parseURL(url);
  const feedWithoutExtraneousMaterials = filterOutFrontMatter(items);
  const filteredFeed = filterForKantArticles
    ? filterForKant(feedWithoutExtraneousMaterials)
    : feedWithoutExtraneousMaterials;
  const rssUrls = filteredFeed.map((item) => item.link);
  return rssUrls;
};

const scrapePages = async (rssURL, config) => {
  try {
    const promises = rssURL.map(async (url) => {
      const { data } = await axios.get(url);
      const doc = domino.createWindow(data).document;

      const metadata = setRuleToMetadata(
        config.metadataConfig,
        doc,
        url,
        config.color
      );

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

const getGenerativeImg = (color) => {
  return `https://generative-placeholders.glitch.me/image?width=1200&height=600&colors=${color}`;
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

exports.scrapePages = scrapePages;
exports.getArticleTags = getArticleTags;
exports.getGenerativeImg = getGenerativeImg;
exports.addCustomRule = addCustomRule;
exports.getRss = getRss;
exports.stripMarkUp = stripMarkUp;
