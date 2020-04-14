const { getMetadata, metadataRuleSets } = require("page-metadata-parser");
const domino = require("domino");
const axios = require("axios").default;
const metaget = require("metaget");

// RSS
let Parser = require("rss-parser");
let parser = new Parser({
  headers: {
    Accept: "application/xml, application/rss+xml, text/xml",
  },
});

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

const setRuleToMetadata = async (config, doc, url, color) => {
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
  try {
    const { items } = await parser.parseURL(url);
    const feedWithoutExtraneousMaterials = filterOutFrontMatter(items);
    const filteredFeed = filterForKantArticles
      ? filterForKant(feedWithoutExtraneousMaterials)
      : feedWithoutExtraneousMaterials;
    // const creator = filteredFeed.map((item) => item.creator.replace(/\n/g, ""));
    // console.log(filteredFeed);
    const data = [];
    filteredFeed.forEach(async (item) => {
      const metadata = {};
      metadata.journalTitle = config.name;

      metadata.author = config.rssConfig.author.do
        ? config.rssConfig.author.do(item[config.rssConfig.author.property])
        : item[config.rssConfig.author.property];

      metadata.date = config.rssConfig.date.do
        ? config.rssConfig.date.do(item[config.rssConfig.date.property])
        : item[config.rssConfig.date.property];

      metadata.title = config.rssConfig.title.do
        ? config.rssConfig.title.do(item[config.rssConfig.title.property])
        : item[config.rssConfig.title.property];

      metadata.url = config.rssConfig.url.do
        ? config.rssConfig.url.do(item[config.rssConfig.url.property])
        : config.rssConfig.url.property;

      data.push(metadata);
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const scrapePages = async (rss, config) => {
  const rssUrls = rss.map((item) => item.link);
  const uniqueUrls = [...new Set(rssUrls)];
  const moddedUrls = uniqueUrls.map((url) => url.replace(/\?af=R/, ""));
  try {
    const promises = moddedUrls.map(async (url) => {
      const { data } = await axios.get(url);
      const doc = domino.createWindow(data).document;
      const metadata = await setRuleToMetadata(
        config.metadataConfig,
        doc,
        url,
        config.color
      );
      return metadata;
    });
    const dataArray = await Promise.all(promises);
    console.log(dataArray);
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

const removeNewLines = (input) => {
  return input.replace(/\n/g, "");
};

const removeParams = (url) => {
  return url.replace(/\?.+/g, "");
};

const lastFirst = (name) => {
  if (!/,/.test(name)) {
    return null;
  }
  const splitAtComma = name.split(",");
  const first = splitAtComma[1].trim();
  const last = splitAtComma[0].trim();
  const fullName = `${first} ${last}`;
  return fullName;
};

const toIso = (date) => {
  const isoDate = new Date(date.replace("-", "/")).toISOString();
  return isoDate;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

exports.scrapePages = scrapePages;
exports.getArticleTags = getArticleTags;
exports.getGenerativeImg = getGenerativeImg;
exports.addCustomRule = addCustomRule;
exports.getRss = getRss;
exports.stripMarkUp = stripMarkUp;
exports.removeNewLines = removeNewLines;
exports.removeParams = removeParams;
exports.lastFirst = lastFirst;
exports.toIso = toIso;
