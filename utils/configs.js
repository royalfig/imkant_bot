const {
  getArticleTags,
  getGenerativeImg,
  getRss,
  removeNewLines,
  removeParams,
  lastFirst,
  toIso,
} = require("./parser");

module.exports.config = {
  british_journal_for_the_history_of_philosophy: {
    name: "British Journal for the History of Philosophy",
    color: "12",
    filter: true,
    image: "",
    url: "https://www.tandfonline.com/feed/rss/rbjh20",

    metadataConfig: {}, // Problem accessing page ? Cookie
  },
  british_journal_for_the_philosophy_of_science: {
    name: "British Journal for the Philosophy of Science",
    url: "https://academic.oup.com/rss/site_5434/3295.xml",
    color: "8",
    filter: true,
    rssOnly: false,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      firstpage: { property: "prism:startingPage", do: false },
      issue: { property: "prism:number", do: false },
      lastpage: { property: "prism:endingPage", do: false },
      title: { property: "title", do: false },
      url: { property: "link", do: removeParams },
      volume: { property: "prism:volume", do: false },
    },

    metadataConfig: {
      abstract: { property: ["general", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: lastFirst },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      institution: {
        property: ["highwirePress", "author_institution"],
        do: false,
      },
      firstpage: { property: ["highwirePress", "firstpage"], do: false },
      lastpage: { property: ["highwirePress", "lastpage"], do: false },
      title: { property: ["highwirePress", "title"], do: false },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      url: { property: ["general", "canonical"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
    },
  },
  kant_studien: {
    name: "Kant Studien",
    url:
      "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml",
    color: "15",
    rss: "custom",
    rssOnly: false,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: false },
      date: { property: "isoDate", do: false },
      title: { property: "title", do: false },
      url: { property: "link", do: false },
    },

    metadataConfig: {
      abstract: { property: "og:description", do: false },
      author: { property: "citation_author", do: false },
      date: { property: "citation_publication_date", do: toIso },
      doi: { property: "citation_doi", do: false },
      institution: { property: "citation_author_institution", do: false },
      firstpage: { property: "citation_firstpage", do: false },
      lastpage: { property: "citation_lastpage", do: false },
      keywords: { property: "article:tag", do: "" }, // get tags function
      title: { property: "og:title", do: false },
      issue: { property: "citation_issue", do: false },
      journalTitle: { property: "citation_journal_title", do: false },
      url: { property: "og:url", do: false },
      volume: { property: "citation_volume", do: false },
    },
  },
  kantian_review: {
    name: "Kantian Review",
    url:
      "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB",
    color: "16",
    filter: false,
    rssOnly: false,

    rssConfig: {
      abstract: { property: "content", do: false },
      author: { property: "creator", do: lastFirst },
      date: { property: "dc:date", do: toIso },
      title: { property: "title", do: false },
      url: { property: "link", do: removeParams },
    },

    metadataConfig: {
      abstract: { property: "citation_abstract", do: "stripMarkUp" }, // func
      author: { property: "citation_author", do: false },
      date: { property: "citation_online_date", do: toIso },
      doi: { property: "citation_doi", do: false },
      institution: { property: "citation_author_institution", do: false },
      firstpage: { property: "citation_firstpage", do: false },
      lastpage: { property: "citation_lastpage", do: false },
      keywords: { property: "citation_keywords", do: "splitAndCapFirstLetter" }, //func
      title: { property: "citation_title", do: false },
      issue: { property: "citation_issue", do: false },
      journalTitle: { property: "citation_journal_title", do: false },
      url: { property: "og:url", do: false },
      volume: { property: "citation_volume", do: false },
    },
  },
  european_journal_of_philosophy: {
    name: "European Journal of Philosophy",
    url: "https://onlinelibrary.wiley.com/feed/14680378/most-recent",
    color: "14",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "date", do: false },
      title: { property: "title", do: false },
      url: { property: "link", do: removeParams },
    },

    metadataConfig: {
      // cookie problems
      abstract: { property: "citation_abstract", do: "stripMarkUp" }, //func
      author: { property: "citation_author", do: false },
      date: { property: "citation_online_date", do: toIso },
      doi: { property: "citation_doi", do: false },
      institution: { property: "citation_author_institution", do: false },
      firstpage: { property: "citation_firstpage", do: false },
      lastpage: { property: "citation_lastpage", do: false },
      keywords: { property: "citation_keywords", do: "splitAndCapFirstLetter" }, //func
      title: { property: "citation_title", do: false },
      issue: { property: "citation_issue", do: false },
      journalTitle: { property: "citation_journal_title", do: false },
      url: { property: "og:url", do: false },
      volume: { property: "citation_volume", do: false },
    },
  },
  canadian_journal_of_philosophy: {
    name: "Canadian Journal of Philosophy",
    url: "https://www.tandfonline.com/feed/rss/rcjp20",
    color: "13",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "description", do: false },
      author: { property: "dc:creator", do: false },
      date: { property: "prism:coverDate", do: false },
      doi: { property: "dc:identifier", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },

    metadataConfig: {
      // cookie problems
      abstract: { property: "citation_abstract", do: "stripMarkUp" }, //func
      author: { property: "citation_author", do: false },
      date: { property: "citation_online_date", do: toIso },
      doi: { property: "citation_doi", do: false },
      institution: { property: "citation_author_institution", do: false },
      firstpage: { property: "citation_firstpage", do: false },
      lastpage: { property: "citation_lastpage", do: false },
      keywords: { property: "citation_keywords", do: "splitAndCapFirstLetter" }, //func
      title: { property: "citation_title", do: false },
      issue: { property: "citation_issue", do: false },
      journalTitle: { property: "citation_journal_title", do: false },
      url: { property: "og:url", do: false },
      volume: { property: "citation_volume", do: false },
    },
  },
  graduate_faculty_philosophy_journal: {
    name: "Graduate Faculty Philosophy Journal",
    url: "https://www.pdcnet.org/pdc/bvdb.nsf/getrssxml?openagent&synonym=gfpj",
    color: "11",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "contentSnippet", do: false },
      author: { property: "creator", do: false },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: null },
    },
  },
  nous: {
    name: "Noûs",
    url: "https://onlinelibrary.wiley.com/feed/14680068/most-recent",
    color: "10",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  ethics: {
    name: "Ethics",
    url:
      "https://www.journals.uchicago.edu/action/showFeed?type=etoc&feed=rss&jc=et",
    color: "9",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  idealistic_studies: {
    name: "Idealistic Studies",
    url:
      "https://www.pdcnet.org/pdc/bvdb.nsf/getrssxml?openagent&synonym=idstudies",
    color: "7",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  inquiry: {
    name: "Inquiry",
    url: "https://www.tandfonline.com/feed/rss/sinq20",
    color: "6",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  the_philosophical_inquiry: {
    name: "The Philosophical Inquiry",
    url: "https://academic.oup.com/rss/site_5498/3359.xml",
    color: "5",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  philosophy_and_phenomenological_research: {
    name: "Philosophy and Phenomenological Research",
    url: "https://onlinelibrary.wiley.com/feed/19331592/most-recent",
    color: "4",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  the_monist: {
    name: "The Monist",
    url: "http://academic.oup.com/rss/site_5491/3352.xml",
    color: "3",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  philosophical_topics: {
    name: "Philosophical Topics",
    url:
      "https://www.pdcnet.org/pdc/bvdb.nsf/getrssxml?openagent&synonym=philtopics",
    color: "2",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  ergo: {
    name: "Ergo",
    url: "https://www.ergophiljournal.org/e/ergo/longfeed.xml",
    color: "1",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  studies_in_history_and_philosophy_of_science_part_a: {
    name: "Studies in History and Philosophy of Science Part A",
    url: "http://rss.sciencedirect.com/publication/science/00393681",
    color: "16",
    filter: true,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "description", do: false },
      author: { property: "creator", do: false },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
  kant_yearbook: {
    name: "Kant Yearbook",
    url:
      "https://www.degruyter.com/journalissuetocrss/journals/kantyb/kantyb-overview.xml",
    color: "17",
    filter: false,
    rssOnly: true,

    rssConfig: {
      abstract: { property: "description", do: false },
      author: { property: "creator", do: false },
      date: { property: "isoDate", do: false },
      doi: { property: "prism:doi", do: false },
      endingpage: { property: "prism:endingPage", do: false },
      startingpage: { property: "prism:startingPage", do: false },
      title: { property: "title", do: false },
      volume: { property: "prism:volume", do: false },
      issue: { property: "prism:number", do: false },
      url: { property: "link", do: removeParams },
    },
  },
};

const scrape = require("html-metadata");
const request = require("request");

const go = async (input) => {
  var options = {
    url:
      "https://academic.oup.com/bjps/article-abstract/71/1/33/4683640?redirectedFrom=fulltext",
    jar: request.jar(), // Cookie jar
    headers: {
      "User-Agent": "webscraper",
    },
  };

  scrape(options).then((metadata, error) => {
    const abstract =
      metadata[input.metadataConfig.abstract.property[0]][
        input.metadataConfig.abstract.property[1]
      ];
    const author =
      metadata[input.metadataConfig.author.property[0]][
        input.metadataConfig.author.property[1]
      ];
    const date =
      metadata[input.metadataConfig.date.property[0]][
        input.metadataConfig.date.property[1]
      ];
    const doi =
      metadata[input.metadataConfig.doi.property[0]][
        input.metadataConfig.doi.property[1]
      ];
    const firstpage =
      metadata[input.metadataConfig.firstpage.property[0]][
        input.metadataConfig.firstpage.property[1]
      ];
    const institution =
      metadata[input.metadataConfig.institution.property[0]][
        input.metadataConfig.institution.property[1]
      ];
    const issue =
      metadata[input.metadataConfig.issue.property[0]][
        input.metadataConfig.issue.property[1]
      ];
    const journalTitle =
      metadata[input.metadataConfig.journalTitle.property[0]][
        input.metadataConfig.journalTitle.property[1]
      ];
    const lastpage =
      metadata[input.metadataConfig.lastpage.property[0]][
        input.metadataConfig.lastpage.property[1]
      ];
    const title =
      metadata[input.metadataConfig.title.property[0]][
        input.metadataConfig.title.property[1]
      ];
    const url =
      metadata[input.metadataConfig.url.property[0]][
        input.metadataConfig.url.property[1]
      ];
    const volume =
      metadata[input.metadataConfig.volume.property[0]][
        input.metadataConfig.volume.property[1]
      ];

    const metadataObject = {
      abstract,
      author,
      date,
      doi,
      firstpage,
      institution,
      issue,
      journalTitle,
      lastpage,
      title,
      url,
      volume,
    };

    console.log(metadataObject);

    if (error) {
      console.log(error);
    }
  });
};
go(this.config.british_journal_for_the_philosophy_of_science);
