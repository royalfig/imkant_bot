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
  constructor(data, config) {
    // basic metainfo
    this.url = data.url;
    this.featureImage =
      `https://generative-placeholders.glitch.me/image?width=1200&height=600&colors=${config.colorSpec}&img="` +
      Date.now();
    this.image = data.image;

    // citation info
    this.author = data.author;
    this.title = this.createTitleOptions(data.title).formattedTitle;
    this.shortTitle = this.createTitleOptions(data.title).shortTitle;
    this.journalTitle = data.journalTitle;
    this.volume = data.volume;
    this.issue = data.issue;
    this.firstpage = data.firstpage;
    this.lastpage = data.lastpage;
    this.date = data.date;
    this.doi = "https://doi.org/" + data.doi;
    this.abstract = data.abstract;
    // this.shortAbstract = this.shortenExcerpt(metadata.abstract);

    // modified info
    this.bookReview = this.createTitleOptions(data.title).bookReview;
    this.keywords = this.constructTags(metadata.tags);
    this.html = this.createPostContent();
    this.ghostObject = this.createGhostObject();
  }

  createTitleOptions(title) {
    if (title == undefined) {
      return { formattedTitle: null, shortTitle: null, bookReview: null };
    }
    let formattedTitle = title.replace(/([a-z])([A-Z])/g, "$1 $2");
    const bookReview = /Seiten?|Pages?|Pp\.?/gi.test(formattedTitle);

    if (bookReview) {
      const bookReviewArray = formattedTitle.split("[,:]");
      const bookReviewTitle = bookReviewArray[1];
      const bookReviewAuthor = bookReviewAuthor[0];
      const createdBookReviewTitle =
        bookReviewTitle + " by " + bookReviewAuthor;
      formattedTitle = createdBookReviewTitle;
    }

    if (formattedTitle.length > 255 && !bookReview) {
      const shortTitle = shortTitle.substring(0, 255);
    } else {
      const shortTitle = formattedTitle;
    }

    const titleObject = { formattedTitle, shortTitle, bookReview };
    return titleObject;
  }

  createPostContent() {
    //  Move date to constructor
    if (!this.date) {
      return null;
    }

    const pubDate = new Date(this.date.replace(/-/g, "/"));

    const formattedDate = `${pubDate.getDate()} ${
      months[pubDate.getMonth()]
    } ${pubDate.getFullYear()}`;

    // TODO Add logic to refine html output when elements are missing.
    const citation = `
      <div class="media">
        <div class="media__left">
          <a href="${this.url}">
            <figure class="media__img-container">
              <img class="media__img" src="${this.image}" alt="${this.title}"/>
            </figure>
          </a>
        </div>
        <div class="media__right">
          <div class="media__content">
            <p>${this.author} published <a href="${this.url}">&ldquo;${this.title}&rdquo;</a> on ${formattedDate} in <em>${this.journalTitle}</em> ${this.volume}.${this.issue}: ${this.firstpage}-${this.lastpage}. <a href="${this.doi}">${this.doi}</a>.</p>
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

  createGhostObject() {
    const objToPost = {
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
    return objToPost;
  }
}
