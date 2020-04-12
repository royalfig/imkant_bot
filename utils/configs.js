const { getRss, addCustomRule, getArticleTags } = require("./parser");

const config = {
  kantStudien: {
    url:
      "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml",
    color: "15",
    rss: true,

    metadataConfig: {
      abstract: "description",
      author: ["name", "citation_author", "content", "author"],
      date: ["name", "citation_publication_date", "content", "date"],
      doi: ["name", "citation_doi", "content", "doi"],
      firstpage: ["name", "citation_firstpage", "content", "firstpage"],
      image: "image",
      issue: ["name", "citation_issue", "content", "issue"],
      journalTitle: [
        "name",
        "citation_journal_title",
        "content",
        "journalTitle",
      ],
      keywords: "getArticleTags",
      lastpage: ["name", "citation_lastpage", "content", "lastpage"],
      title: ["name", "citation_title", "content", "title"],
      url: "url",
      volume: ["name", "citation_volume", "content", "volume"],
    },
  },
  kantianReview: {
    url:
      "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB",
    color: "16",
    filter: false,
    metadataConfig: {
      abstract: ["name", "citation_abstract", "content", "abstract"],
      author: ["name", "citation_author", "content", "author"],
      date: ["name", "citation_publication_date", "content", "date"],
      doi: ["name", "citation_doi", "content", "doi"],
      firstpage: ["name", "citation_firstpage", "content", "firstpage"],
      image:
        "https://generative-placeholders.glitch.me/image?width=1200&height=600&colors=16&img=" +
        Date.now(),
      issue: ["name", "citation_issue", "content", "issue"],
      journalTitle: [
        "name",
        "citation_journal_title",
        "content",
        "journalTitle",
      ],
      keywords: ["name", "citation_keywords", "content", "keywords"],
      lastpage: ["name", "citation_lastpage", "content", "lastpage"],
      title: ["name", "citation_title", "content", "title"],
      url: "url",
      volume: ["name", "citation_volume", "content", "volume"],
    },
  },
  europeanJournalofPhil: {
    url: "https://onlinelibrary.wiley.com/feed/14680378/most-recent",
    color: "14",
    filter: true,

    metadataConfig: {
      abstract: "description",
      author: ["name", "citation_author", "content", "author"],
      authorInstitution: [
        "name",
        "citation_author_institution",
        "content",
        "institution",
      ],
      date: ["name", "citation_online_date", "content", "date"],
      doi: ["name", "citation_doi", "content", "doi"],
      firstpage: ["name", "citation_firstpage", "content", "firstpage"],
      image: "image",
      issue: ["name", "citation_issue", "content", "issue"],
      journalTitle: [
        "name",
        "citation_journal_title",
        "content",
        "journalTitle",
      ],
      keywords: ["name", "citation_keywords", "content", "keywords"],
      lastpage: ["name", "citation_lastpage", "content", "lastpage"],
      title: ["name", "citation_title", "content", "title"],
      url: "url",
      volume: ["name", "citation_volume", "content", "volume"],
    },
  },
};

// getRSS  -> Returns feed
// filter feed

getRss(config.kantianReview);
