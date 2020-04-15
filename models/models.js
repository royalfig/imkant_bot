const { stripMarkUp } = require("../utils/util");

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
    this.institution = data.institution;
    this.issue = data.issue;
    this.journalTitle = data.journalTitle;
    this.lastpage = data.lastpage;
    this.tags = this.createKeywords(data.keywords);
    this.url = data.url;
    this.volume = data.volume;

    // Data modified and other values
    this.bookReview = this.createTitleOptions(data.title).bookReview;
    this.doi = "https://doi.org/" + data.doi;
    this.longTitle = this.createTitleOptions(data.title).longTitle;
    this.shortAbstract = this.shortenAbstract(stripMarkUp(this.abstract));
    this.shortTitle = this.createTitleOptions(data.title).shortTitle;
    this.formattedDate = this.formatDate(this.date);

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

    const bookReview = /Seiten?|Pages?|Pp\.?/gi.test(longTitle);

    let shortTitle = longTitle;

    if (longTitle.length > 255) {
      shortTitle = longTitle.substring(0, 255);
    }

    const titleObject = { longTitle, shortTitle, bookReview };
    return titleObject;
  }

  formatDate(isoDate) {
    if (!isoDate) {
      return isoDate;
    }

    const jsDate = new Date(isoDate);
    const dateNum = jsDate.getDate();
    const month = months[jsDate.getMonth()];
    const year = jsDate.getFullYear();

    const formattedDate = `${month} ${dateNum}, ${year}`;
    return formattedDate;
  }

  createKeywords(keywords) {
    if (this.bookReview && keywords) {
      keywords.push("Book Review", this.journalTitle);
      return keywords;
    }
    if (!keywords && this.bookReview) {
      return ["Book Review", this.journalTitle];
    }
    if (!keywords && !this.bookReview) {
      return ["Article", this.journalTitle];
    }
    keywords.push("Article", this.journalTitle);
    return keywords;
  }

  createPostContent() {
    const img = this.image || this.featureImage;
    const author = this.author || `${this.journalTitle}`;
    const institution =
      this.institution !== undefined ? ` (${this.institution}) ` : "";
    // TODO Add logic to refine html output when elements are missing.
    const citation = `
      <div class="media">
        <div class="media__left">
          <a href="${this.url}">
            <figure class="media__img-container">
              <img class="media__img" src="${img}" alt="${this.shortTitle}"/>
            </figure>
          </a>
        </div>
        <div class="media__right">
          <div class="media__content">
            <p>${author}${institution} published <a href="${this.url}">&ldquo;${this.longTitle}&rdquo;</a> on ${this.formattedDate} in <em>${this.journalTitle}</em> ${this.volume}.${this.issue}: ${this.firstpage}-${this.lastpage}. <a href="${this.doi}">${this.doi}</a>.</p>
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

  createGhostModel() {
    const objToPost = {
      title: this.shortTitle,
      published_at: this.date,
      mobiledoc: this.mobiledoc,
      tags: this.tags,
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
