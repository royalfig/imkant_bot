const {
  getRss,
  scrapePages,
  addCustomRule,
  getArticleTags,
  getGenerativeImg,
} = require("./parser");

const config = {
  kantStudien: {
    url:
      "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml",
    color: "15",
    rss: "custom",

    metadataConfig: {
      abstract: {
        customRule: "custom",
        value: ["property", "og:description", "content", "abstract"],
      },
      author: {
        customRule: "custom",
        value: ["name", "citation_author", "content", "author"],
      },
      date: {
        customRule: "custom",
        value: ["name", "citation_publication_date", "content", "date"],
      },
      doi: {
        customRule: "custom",
        value: ["name", "citation_doi", "content", "doi"],
      },
      firstpage: {
        customRule: "custom",
        value: ["name", "citation_firstpage", "content", "firstpage"],
      },
      image: { customRule: "default", value: "image" },
      issue: {
        customRule: "custom",
        value: ["name", "citation_issue", "content", "issue"],
      },
      journalTitle: {
        customRule: "custom",
        value: ["name", "citation_journal_title", "content", "journalTitle"],
      },
      keywords: { customRule: "tags", value: getArticleTags },
      lastpage: {
        customRule: "custom",
        value: ["name", "citation_lastpage", "content", "lastpage"],
      },
      title: {
        customRule: "custom",
        value: ["name", "citation_title", "content", "title"],
      },
      url: { customRule: "default", value: "url" },
      volume: {
        customRule: "custom",
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
        customRule: "custom",
        value: ["name", "citation_abstract", "content", "abstract"],
      },
      author: {
        customRule: "custom",
        value: ["name", "citation_author", "content", "author"],
      },
      date: {
        customRule: "custom",
        value: ["name", "citation_publication_date", "content", "date"],
      },
      doi: {
        customRule: "custom",
        value: ["name", "citation_doi", "content", "doi"],
      },
      firstpage: {
        customRule: "custom",
        value: ["name", "citation_firstpage", "content", "firstpage"],
      },
      image: { customRule: "image", value: getGenerativeImg },
      issue: {
        customRule: "custom",
        value: ["name", "citation_issue", "content", "issue"],
      },
      journalTitle: {
        customRule: "custom",
        value: ["name", "citation_journal_title", "content", "journalTitle"],
      },
      keywords: {
        customRule: "custom",
        value: ["name", "citation_keywords", "content", "keywords"],
      },
      lastpage: {
        customRule: "custom",
        value: ["name", "citation_lastpage", "content", "lastpage"],
      },
      title: {
        customRule: "custom",
        value: ["name", "citation_title", "content", "title"],
      },
      url: { customRule: "default", value: "url" },
      volume: {
        customRule: "custom",
        value: ["name", "citation_volume", "content", "volume"],
      },
    },
  },
  europeanJournalofPhil: {
    url: "https://onlinelibrary.wiley.com/feed/14680378/most-recent",
    color: "14",
    filter: "custom",

    metadataConfig: {
      abstract: {
        customRule: "custom",
        value: ["property", "description", "content", "abstract"],
      },
      author: {
        customRule: "custom",
        value: ["name", "citation_author", "content", "author"],
      },
      authorInstitution: {
        customRule: "custom",
        value: [
          "name",
          "citation_author_institution",
          "content",
          "institution",
        ],
      },
      date: {
        customRule: "custom",
        value: ["name", "citation_online_date", "content", "date"],
      },
      doi: {
        customRule: "custom",
        value: ["name", "citation_doi", "content", "doi"],
      },
      firstpage: {
        customRule: "custom",
        value: ["name", "citation_firstpage", "content", "firstpage"],
      },
      image: { customRule: "default", value: "image" },
      issue: {
        customRule: "custom",
        value: ["name", "citation_issue", "content", "issue"],
      },
      journalTitle: {
        customRule: "custom",
        value: ["name", "citation_journal_title", "content", "journalTitle"],
      },
      keywords: {
        customRule: "custom",
        value: ["name", "citation_keywords", "content", "keywords"],
      },
      lastpage: {
        customRule: "custom",
        value: ["name", "citation_lastpage", "content", "lastpage"],
      },
      title: {
        customRule: "custom",
        value: ["name", "citation_title", "content", "title"],
      },
      url: { customRule: "default", value: "url" },
      volume: {
        customRule: "custom",
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
