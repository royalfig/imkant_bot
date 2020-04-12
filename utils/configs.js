const {
  getRss,
  scrapePages,
  addCustomRule,
  getArticleTags,
} = require("./parser");

const config = {
  kantStudien: {
    url:
      "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml",
    color: "15",
    rss: true,

    metadataConfig: {
      abstract: { customRule: "default", value: "description" },
      author: {
        customRule: true,
        value: ["name", "citation_author", "content", "author"],
      },
      date: {
        customRule: true,
        value: ["name", "citation_publication_date", "content", "date"],
      },
      doi: {
        customRule: true,
        value: ["name", "citation_doi", "content", "doi"],
      },
      firstpage: {
        customRule: true,
        value: ["name", "citation_firstpage", "content", "firstpage"],
      },
      image: { customRule: "default", value: "image" },
      issue: {
        customRule: true,
        value: ["name", "citation_issue", "content", "issue"],
      },
      journalTitle: {
        customRule: true,
        value: ["name", "citation_journal_title", "content", "journalTitle"],
      },
      keywords: { customRule: "function", value: ["getArticleTags", "doc"] },
      lastpage: {
        customRule: true,
        value: ["name", "citation_lastpage", "content", "lastpage"],
      },
      title: {
        customRule: true,
        value: ["name", "citation_title", "content", "title"],
      },
      url: { customRule: "default", value: "url" },
      volume: {
        customRule: true,
        value: ["name", "citation_volume", "content", "volume"],
      },
    },
  },
  kantianReview: {
    url:
      "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB",
    color: "16",
    filter: false,
    metadataConfig: {
      abstract: {
        customRule: true,
        value: ["name", "citation_abstract", "content", "abstract"],
      },
      author: {
        customRule: true,
        value: ["name", "citation_author", "content", "author"],
      },
      date: {
        customRule: true,
        value: ["name", "citation_publication_date", "content", "date"],
      },
      doi: {
        customRule: true,
        value: ["name", "citation_doi", "content", "doi"],
      },
      firstpage: {
        customRule: true,
        value: ["name", "citation_firstpage", "content", "firstpage"],
      },
      image: { customRule: "function", value: ["getGenerativeImg", "16"] },
      issue: {
        customRule: true,
        value: ["name", "citation_issue", "content", "issue"],
      },
      journalTitle: {
        customRule: true,
        value: ["name", "citation_journal_title", "content", "journalTitle"],
      },
      keywords: {
        customRule: true,
        value: ["name", "citation_keywords", "content", "keywords"],
      },
      lastpage: {
        customRule: true,
        value: ["name", "citation_lastpage", "content", "lastpage"],
      },
      title: {
        customRule: true,
        value: ["name", "citation_title", "content", "title"],
      },
      url: { customRule: "default", value: "url" },
      volume: {
        customRule: true,
        value: ["name", "citation_volume", "content", "volume"],
      },
    },
  },
  europeanJournalofPhil: {
    url: "https://onlinelibrary.wiley.com/feed/14680378/most-recent",
    color: "14",
    filter: true,

    metadataConfig: {
      abstract: { customRule: "default", value: "description" },
      author: {
        customRule: true,
        value: ["name", "citation_author", "content", "author"],
      },
      authorInstitution: {
        customRule: true,
        value: [
          "name",
          "citation_author_institution",
          "content",
          "institution",
        ],
      },
      date: {
        customRule: true,
        value: ["name", "citation_online_date", "content", "date"],
      },
      doi: {
        customRule: true,
        value: ["name", "citation_doi", "content", "doi"],
      },
      firstpage: {
        customRule: true,
        value: ["name", "citation_firstpage", "content", "firstpage"],
      },
      image: { customRule: "default", value: "image" },
      issue: {
        customRule: true,
        value: ["name", "citation_issue", "content", "issue"],
      },
      journalTitle: {
        customRule: true,
        value: ["name", "citation_journal_title", "content", "journalTitle"],
      },
      keywords: {
        customRule: true,
        value: ["name", "citation_keywords", "content", "keywords"],
      },
      lastpage: {
        customRule: true,
        value: ["name", "citation_lastpage", "content", "lastpage"],
      },
      title: {
        customRule: true,
        value: ["name", "citation_title", "content", "title"],
      },
      url: { customRule: "default", value: "url" },
      volume: {
        customRule: true,
        value: ["name", "citation_volume", "content", "volume"],
      },
    },
  },
};

// getRSS  -> Returns feed
// filter feed

const s = async () => {
  const rss = await getRss(config.kantianReview);
  const result = await scrapePages(rss, config.kantianReview);
  console.log(result);
};

s();
