const { getData, postToGhost } = require("./getData");
const Article = require("./createArticle");
const url =
  "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml";
// "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB"

const config = {
  kantStudien: {
    url:
      "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml",
    color: "15"
  },
  kantianReview: {
    url:
      "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB",
    color: "16"
  },
  europeJournal: {
    url: "https://onlinelibrary.wiley.com/feed/14680378/most-recent",
    color: "14"
  }
};

const obj = async url => {
  const res = await getData(url);
  return res;
};

obj(config.europeJournal.url).then(res => {
  res.forEach(item => {
    const article = new Article(item, config.europeJournal.color).ghostObject;
    postToGhost(article);
  });
});

// Specific config for each title
// Efficient posting [put into an array and then post array]
// Get current posts and then delete
// Pagination for multiple posts on client
