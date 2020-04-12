const { getData, postToGhost } = require("./getData");
const Article = require("./createArticle");
const url =
  "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml";
// "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB"

const config = {
  kantStudien: {
    url:
      "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml",
    color: "15",
    rss: true,

    metadataConfig: {
      abstract: "description",
      author: addCustomRule("name", "citation_author", "content", "author"),
      date: addCustomRule(
        "name",
        "citation_publication_date",
        "content",
        "date"
      ),
      doi: addCustomRule("name", "citation_doi", "content", "doi"),
      firstpage: addCustomRule(
        "name",
        "citation_firstpage",
        "content",
        "firstpage"
      ),
      image: "image",
      issue: addCustomRule("name", "citation_issue", "content", "issue"),
      journalTitle: addCustomRule(
        "name",
        "citation_journal_title",
        "content",
        "journalTitle"
      ),
      keywords: getArticleTags(doc),
      lastpage: addCustomRule(
        "name",
        "citation_lastpage",
        "content",
        "lastpage"
      ),
      title: addCustomRule("name", "citation_title", "content", "title"),
      url: "url",
      volume: addCustomRule("name", "citation_volume", "content", "volume"),
    },
  },
  kantianReview: {
    url:
      "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB",
    color: "16",
    filter: false,
    metadataConfig: {
      abstract: addCustomRule(
        "name",
        "citation_abstract",
        "content",
        "abstract"
      ),
      author: addCustomRule("name", "citation_author", "content", "author"),
      date: addCustomRule(
        "name",
        "citation_publication_date",
        "content",
        "date"
      ),
      doi: addCustomRule("name", "citation_doi", "content", "doi"),
      firstpage: addCustomRule(
        "name",
        "citation_firstpage",
        "content",
        "firstpage"
      ),
      image:
        "https://generative-placeholders.glitch.me/image?width=1200&height=600&colors=16&img=" +
        Date.now(),
      issue: addCustomRule("name", "citation_issue", "content", "issue"),
      journalTitle: addCustomRule(
        "name",
        "citation_journal_title",
        "content",
        "journalTitle"
      ),
      keywords: addCustomRule(
        "name",
        "citation_keywords",
        "content",
        "keywords"
      ),
      lastpage: addCustomRule(
        "name",
        "citation_lastpage",
        "content",
        "lastpage"
      ),
      title: addCustomRule("name", "citation_title", "content", "title"),
      url: "url",
      volume: addCustomRule("name", "citation_volume", "content", "volume"),
    },
  },
  europeanJournalofPhil: {
    url: "https://onlinelibrary.wiley.com/feed/14680378/most-recent",
    color: "14",
    filter: true,

    metadataConfig: {
      abstract: "description",
      author: addCustomRule("name", "citation_author", "content", "author"),
      authorInstitution: addCustomRule(
        "name",
        "citation_author_institution",
        "content",
        "institution"
      ),
      date: addCustomRule("name", "citation_online_date", "content", "date"),
      doi: addCustomRule("name", "citation_doi", "content", "doi"),
      firstpage: addCustomRule(
        "name",
        "citation_firstpage",
        "content",
        "firstpage"
      ),
      image: "image",
      issue: addCustomRule("name", "citation_issue", "content", "issue"),
      journalTitle: addCustomRule(
        "name",
        "citation_journal_title",
        "content",
        "journalTitle"
      ),
      keywords: addCustomRule(
        "name",
        "citation_keywords",
        "content",
        "keywords"
      ),
      lastpage: addCustomRule(
        "name",
        "citation_lastpage",
        "content",
        "lastpage"
      ),
      title: addCustomRule("name", "citation_title", "content", "title"),
      url: "url",
      volume: addCustomRule("name", "citation_volume", "content", "volume"),
    },
  },
};

const obj = async (url) => {
  const res = await getData(url);
  return res;
};

obj(config.kantianReview.url).then((res) => {
  res.forEach((item) => {
    const article = new Article(item, config.kantianReview.color).ghostObject;
    postToGhost(article);
  });
});
