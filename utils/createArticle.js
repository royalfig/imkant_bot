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

class Article {
  constructor(data) {
    // basic metainfo
    this.url = data.url;
    this.featureImage =
      `https://generative-placeholders.glitch.me/image?width=1200&height=600&colors=15&img="` +
      Date.now();
    this.image = data.image;

    // citation info
    this.author = data.author;
    this.title = this.createTitleOptions(data.title).shortTitle;
    this.fulltitle = this.createTitleOptions(data.title).formattedTitle;
    this.journalTitle = data.journalTitle;
    this.volume = data.volume;
    this.issue = data.issue;
    this.firstpage = data.firstpage;
    this.lastpage = data.lastpage;
    this.date = data.date;

    this.doi = "https://doi.org/" + data.doi;
    this.abstract = data.abstract;

    // modified info
    this.bookReview = this.createTitleOptions(data.title).bookReview;
    this.keywords = data.customKeywords;

    this.keywordArray = this.keywordArrayCreator(data.customKeywords);
    this.shortAbstract = this.shortenAbstract(this.abstract);
    this.html = this.createPostContent();
    this.ghostObject = this.createGhostObject();
    // this.test = console.log(this.ghostObject);
  }

  createTitleOptions(title) {
    if (title === undefined) {
      return {
        formattedTitle: "no title",
        shortTitle: "no title",
        bookReview: "no title"
      };
    }
    let formattedTitle = title.replace(/([a-z])([A-Z])/g, "$1 $2");
    const bookReview = /Seiten?|Pages?|Pp\.?/gi.test(formattedTitle);

    let shortTitle = formattedTitle;
    if (bookReview) {
      const bookReviewArray = formattedTitle.split(":");
      const bookReviewTitle = bookReviewArray[1];
      const bookReviewAuthor = bookReviewArray[0];
      const createdBookReviewTitle =
        bookReviewTitle + " by " + bookReviewAuthor;
      shortTitle = createdBookReviewTitle;
    }

    if (formattedTitle.length > 255 && !bookReview) {
      shortTitle = formattedTitle.substring(0, 255);
    }

    const titleObject = { formattedTitle, shortTitle, bookReview };
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

  keywordArrayCreator(input) {
    let newArray = input ? input.split(";") : [];

    if (this.bookReview) {
      newArray.push("Book Review");
    } else {
      newArray.push("Article");
    }
    console.log(newArray);
    return newArray;
  }

  createPostContent() {
    //  Move date to constructor

    const formattedDate = this.createDate(this.date).formattedDate;

    // TODO Add logic to refine html output when elements are missing.
    const citation = `
      <div class="media">
        <div class="media__left">
          <a href="${this.url}">
            <figure class="media__img-container">
              <img class="media__img" src="${this.image}" alt="${this.fulltitle}"/>
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
      sections: [[10, 0]]
    });

    return mobiledoc;
  }

  shortenAbstract(input) {
    return input.substring(0, 300);
  }

  createGhostObject() {
    const objToPost = {
      title: this.title,
      published_at: this.createDate(this.date).publishedDate,
      mobiledoc: this.html,
      tags: this.keywordArray,
      feature_image: this.featureImage,
      authors: ["rfeigenb@nd.edu"],
      custom_excerpt: this.shortAbstract,
      excerpt: this.shortAbstract,
      meta_description: this.shortAbstract
    };
    return objToPost;
  }
}
module.exports = Article;
