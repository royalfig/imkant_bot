const stripMarkUp = require("../utils/parser");

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
  "December",
];

class Article {
  constructor(data, color) {
    // default info
    this.featureImage =
      `https://generative-placeholders.glitch.me/image?width=1200&height=600&colors=${color}&img=` +
      Date.now();

    // info provided by parser
    this.abstract = data.abstract;
    this.author = data.author;
    this.date = data.date;
    this.firstpage = data.firstpage;
    this.image = data.image;
    this.issue = data.issue;
    this.journalTitle = data.journalTitle;
    this.keywords = data.keywords;
    this.lastpage = data.lastpage;
    this.url = data.url;
    this.volume = data.volume;

    // Data modified and other values
    this.bookReview = this.createTitleOptions(data.title).bookReview;
    this.doi = "https://doi.org/" + data.doi;
    this.keywordArray = this.keywordArrayCreator(data.keywords);
    this.longTitle = this.createTitleOptions(data.title).longTitle;
    this.shortAbstract = this.shortenAbstract(stripMarkUp(this.abstract));
    this.shortTitle = this.createTitleOptions(data.title).shortTitle;

    // Create content and post model
    this.mobiledoc = this.createPostContent();
    this.ghostModel = this.createGhostModel();
  }

  // Methods
  createTitleOptions(title) {
    if (title === undefined) {
      return {
        longTitle: "no title",
        shortTitle: "no title",
        bookReview: "no title",
      };
    }
    let longTitle = stripMarkUp(title.replace(/([a-z])([A-Z])/g, "$1 $2"));
    const bookReview = /Seiten?|Pages?|Pp\.?/gi.test(formattedTitle);

    let shortTitle = longTitle;
    if (bookReview) {
      const bookReviewArray = longTitle.split(":");
      const bookReviewTitle = bookReviewArray[1];
      const bookReviewAuthor = bookReviewArray[0];
      const createdBookReviewTitle =
        bookReviewTitle + " by " + bookReviewAuthor;
      shortTitle = createdBookReviewTitle;
    }

    if (longTitle.length > 255 && !bookReview) {
      shortTitle = longTitle.substring(0, 255);
    }

    const titleObject = { longTitle, shortTitle, bookReview };
    return titleObject;
  }

  createDate(date) {
    if (!date) {
      return { formattedDate: null, publishedDate: null };
    }
    const pubDate = new Date(date.replace(/-/g, "/"));

    const formattedDate = `${pubDate.getDate()} ${
      months[pubDate.getMonth()]
    } ${pubDate.getFullYear()}`;

    const publishedDate = new Date(date.replace(/-/g, "/")).toISOString();

    return { formattedDate, publishedDate };
  }

  keywordArrayCreator(tagArray, keywords) {
    let newArray = [];
    if (tagArray) {
      newArray = tagArray;
    } else {
      newArray = keywords ? keywords.split(";") : [];
    }

    const capFirstLetter = newArray.map((tag) => {
      tag.toLowerCase().replace(/\b(\w)/g, (match) => match.toUpperCase());
    });

    if (this.bookReview) {
      capFirstLetter.push(this.journalTitle, "Book Review");
    } else {
      capFirstLetter.push(this.journalTitle, "Article");
    }
    return capFirstLetter;
  }

  createPostContent() {
    //  Move date to constructor

    const formattedDate = this.createDate(this.date).formattedDate;
    const img = this.image || this.featureImage;

    // TODO Add logic to refine html output when elements are missing.
    const citation = `
      <div class="media">
        <div class="media__left">
          <a href="${this.url}">
            <figure class="media__img-container">
              <img class="media__img" src="${img}" alt="${this.fulltitle}"/>
            </figure>
          </a>
        </div>
        <div class="media__right">
          <div class="media__content">
            <p>${this.author} published <a href="${this.url}">&ldquo;${this.fulltitle}&rdquo;</a> on ${formattedDate} in <em>${this.journalTitle}</em> ${this.volume}.${this.issue}: ${this.firstpage}-${this.lastpage}. <a href="${this.doi}">${this.doi}</a>.</p>
          </div>
        </div>
      </div>`;

    // Only add the abstract if content is not a book review
    const html = this.bookReview ? citation : citation + this.abstract;

    // To preserve HTML format, convert the raw HTML into an HTML card
    const mobiledoc = JSON.stringify({
      version: "0.3.1",
      markups: [],
      atoms: [],
      cards: [["html", { cardName: "html", html: html }]],
      sections: [[10, 0]],
    });

    return mobiledoc;
  }

  shortenAbstract(input) {
    return input.substring(0, 300);
  }

  createGhostObject() {
    const objToPost = {
      title: this.shorTitle,
      published_at: this.createDate(this.date).publishedDate,
      mobiledoc: this.mobiledoc,
      tags: this.keywordArray,
      feature_image: this.featureImage,
      authors: ["rfeigenb@nd.edu"],
      custom_excerpt: this.shortAbstract,
      excerpt: this.shortAbstract,
      meta_description: this.shortAbstract,
    };
    return objToPost;
  }
}
module.exports = Article;
