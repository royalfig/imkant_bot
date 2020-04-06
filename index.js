// Node
const fs = require("fs");
const path = require("path");

//Local
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Libs
require("dotenv").config();
const apiKey = process.env.GHOST;

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
const existingPosts = api.posts.browse();

// Global Functions
const addCustomRule = (key, keyContent, property, name) => {
  const meta = "meta[" + key + "=" + '"' + keyContent + '"]';
  const rule = {
    rules: [[meta, element => element.getAttribute(property)]]
  };
  metadataRuleSets[name] = rule;
};

// meta[property="article:tag"],
addCustomRule("name", "citation_author", "content", "author");
addCustomRule("property", "og:description", "content", "abstract");
addCustomRule("name", "citation_keywords", "content", "keyword");
addCustomRule("name", "citation_journal_title", "content", "journalTitle");
addCustomRule("name", "citation_doi", "content", "doi");
addCustomRule("name", "citation_firstpage", "content", "firstpage");
addCustomRule("name", "citation_lastpage", "content", "lastpage");
addCustomRule("name", "citation_volume", "content", "volume");
addCustomRule("name", "citation_issue", "content", "issue");
addCustomRule("name", "citation_title", "content", "title");
addCustomRule("property", "article:published_time", "content", "date");

class Article {
  constructor(metadata) {
    this.author = metadata.author;
    this.title = this.titleFormat(metadata.title);
    this.shortenedTitle = this.shortenTitle(this.title);
    this.journalTitle = metadata.journalTitle;
    this.issue = metadata.issue;
    this.volume = metadata.volume;
    this.abstract = metadata.abstract;
    this.shortAbstract = this.shortenExcerpt(metadata.abstract);
    this.doi = "https://doi.org/" + metadata.doi;
    this.date = metadata.date;
    this.image = metadata.image;
    this.featureImage =
      'https://generative-placeholders.glitch.me/image?width=1200&height=600&colors=16&img="' +
      Date.now();
    this.bookReview = this.bookReviewCheck(this.title);
    this.url = metadata.url;
    this.firstpage = metadata.firstpage;
    this.lastpage = metadata.lastpage;
    this.keywords = this.constructTags(metadata.tags);
    this.html = this.createHTML();
  }

  createGhostObject() {
    const obj = {
      id: this.doi,
      title: this.shortenedTitle,
      published_at: new Date(this.date.replace(/-/g, "/")).toISOString(),
      mobiledoc: this.html,
      tags: this.keywords,
      feature_image: this.featureImage,
      authors: ["rfeigenb@nd.edu"],
      custom_excerpt: this.shortAbstract,
      excerpt: this.shortAbstract,
      meta_description: this.shortAbstract
    };
    return obj;
  }

  titleFormat(title) {
    if (title == undefined) {
      return title;
    }
    return title.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  shortenTitle(title) {
    if (title == undefined) {
      return title;
    }
    if (title.length > 254) {
      const shortenedTitle = title.substring(0, 254);
      return shortenedTitle;
    }
    return title;
  }

  createHTML() {
    if (!this.date) {
      return null;
    }

    const pubDate = new Date(this.date.replace(/-/g, "/"));

    const formattedDate = `${pubDate.getDate()} ${
      months[pubDate.getMonth()]
    } ${pubDate.getFullYear()}`;

    const img = `
    <a href="${this.url}">
      <figure class="media__img-container">
        <img class="media__img" src="${this.image}" alt="${this.title}"/>
      </figure>
    </a>`;
    const citation = `
    <div class="media">
      <div class="media__left">
        ${img}
      </div>
      <div class="media__right">
        <div class="media__content">
          <p>${this.author} published <a href="${this.url}">&ldquo;${this.title}&rdquo;</a> on ${formattedDate} in <em>${this.journalTitle}</em> ${this.volume}.${this.issue}: ${this.firstpage}-${this.lastpage}. <a href="${this.doi}">${this.doi}</a>.</p>
        </div>
      </div>
    </div>`;
    const html = this.bookReview ? citation : citation + this.abstract;
    const mobiledoc = JSON.stringify({
      version: "0.3.1",
      markups: [],
      atoms: [],
      cards: [["html", { cardName: "html", html: html }]],
      sections: [[10, 0]]
    });
    // console.log(mobiledoc);
    return mobiledoc;
  }

  constructTags(tags) {
    if (!tags) {
      return tags;
    }
    const normalizedTagArray = tags.map(tag => tag.toLowerCase().trim());
    this.bookReview
      ? normalizedTagArray.push("book review", this.journalTitle)
      : normalizedTagArray.push("article", this.journalTitle);
    return normalizedTagArray;
  }

  bookReviewCheck(title) {
    const bookReviewTest = /Seiten?|Pages?|Pp\.?/gi.test(title);
    return bookReviewTest;
  }

  shortenExcerpt(input) {
    if (input.length) {
      const excerpt = input
        .replace(/<\/?section.+>/g, "")
        .replace(/<h2.+>.+<\/h2>/g, "")
        .replace(/<p>|<em>|<\/em>/g, "")
        .replace(/<\/p>/g, " ");
      return excerpt.substring(0, 256);
    }
    return input;
  }

  static deleteDrafts() {
    existingPosts.then(posts =>
      posts.forEach(post => {
        if (post.status === "draft") {
          api.posts.delete({ id: post.id });
        }
      })
    );
  }

  static deletePublished() {
    existingPosts.then(posts =>
      posts.forEach(post => {
        api.posts.delete({ id: post.id });
      })
    );
  }
}

const urlFetch = async url => {
  try {
    const { data } = await axios.get(url);
    const doc = domino.createWindow(data).document;
    const tags = [...doc.querySelectorAll("meta[property='article:tag']")];
    const tagArray = [];
    tags.forEach(x => tagArray.push(x.getAttribute("content")));
    const metadata = getMetadata(doc, url);
    metadata.tags = tagArray;
    const ghostPost = new Article(metadata).createGhostObject();

    existingPosts
      .then(posts => posts.map(post => post.title))
      .then(titleArray => {
        const duplicate = titleArray.includes(ghostPost.title);
        if (!duplicate) {
          api.posts
            .add(ghostPost, { source: "html" })
            .then(response =>
              console.log("\n✔ Successfully posted " + ghostPost.title + "✔ /n")
            )
            .catch(error =>
              console.error(
                "\n⚠ There was an error with " + ghostPost.title + "⚠ \n",
                error
              )
            );
        } else {
          console.log(`\n⚠ Not posted! ${ghostPost.title} is a duplicate ⚠ \n`);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

const rssParser = async url => {
  let result = await parser.parseURL(url);
  result.items.forEach(item => {
    urlFetch(item.link);
  });
  fs.writeFile(result.title + ".json", JSON.stringify(result), err => {
    if (err) return console.log(err);
  });
};

rssParser(
  "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml"
);

// Article.deleteDrafts();

/* Kant Journals
👉Kant Studien: https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml
Kant Studien 2: https://www.degruyter.com/journalnewarticlerss/journals/kant/kant-overview.xml
Kantian Review:  https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB
Kant Yearbook: https://www.degruyter.com/journalissuetocrss/journals/kantyb/kantyb-overview.xml
European Journal of Philosophy: https://www.degruyter.com/journalissuetocrss/journals/kantyb/kantyb-overview.xml

*/
