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
    rssOnly: false,
    url: "https://www.tandfonline.com/feed/rss/rbjh20",

    metadataConfig: {
      abstract: { property: ["general", "description"], do: false },
      author: { property: ["dublinCore", "creator"], do: "removeDoubleSpace" },
      date: { property: ["dublinCore", "date"], do: "convert 9 Jul 2019" },
      doi: { property: ["dublinCore", "identifier"], do: "firstItemInArr" },
      title: { property: ["dublinCore", "title"], do: false },
      image: { property: ["openGraph", "image"], do: false },
      keywords: { property: ["dublinCore", "subject"], do: "arraySplitter" },
      url: { property: ["openGraph", "url"], do: false },
    },
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
      author: { property: ["highwirePress", "author"], do: "arr?lastFirst" },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      institution: {
        property: ["highwirePress", "author_institution"],
        do: "arr?",
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
      abstract: { property: ["openGraph", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: false },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      firstpage: { property: ["highwirePress", "firstpage"], do: false },
      lastpage: { property: ["highwirePress", "lastpage"], do: false },
      image: { property: ["openGraph", "image"], do: "getUrl" },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      keywords: { property: ["openGraph", "tag"], do: false },
      title: { property: ["openGraph", "title"], do: false },
      url: { property: ["general", "canonical"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
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
      abstract: { property: ["highwirePress", "abstract"], do: "stripMU" },
      author: { property: ["highwirePress", "author"], do: false },
      date: { property: ["highwirePress", "online_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      firstpage: { property: ["highwirePress", "firstpage"], do: false },
      lastpage: { property: ["highwirePress", "lastpage"], do: false },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      keywords: {
        property: ["highwirePress", "keywords"],
        do: "splitIntoArray",
      },
      title: { property: ["highwirePress", "title"], do: false },
      url: { property: ["general", "canonical"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
    },
  },
  european_journal_of_philosophy: {
    name: "European Journal of Philosophy",
    url: "https://onlinelibrary.wiley.com/feed/14680378/most-recent",
    color: "14",
    filter: true,
    rssOnly: false,

    rssConfig: {
      abstract: { property: "content:encoded", do: false },
      author: { property: "creator", do: removeNewLines },
      date: { property: "date", do: false },
      title: { property: "title", do: false },
      url: { property: "link", do: removeParams },
    },

    metadataConfig: {
      abstract: { property: ["openGraph", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: false },
      date: { property: ["highwirePress", "online_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      image: { property: ["openGraph", "image"], do: "getUrl" },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      title: { property: ["openGraph", "title"], do: false },
      url: { property: ["openGraph", "url"], do: false },
    },
  },
  canadian_journal_of_philosophy: {
    name: "Canadian Journal of Philosophy",
    url: "https://www.tandfonline.com/feed/rss/rcjp20",
    color: "13",
    filter: true,
    rssOnly: false,

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
      abstract: { property: ["dublinCore", "description"], do: false },
      author: { property: ["dublinCore", "creator"], do: false },
      date: { property: ["dublinCore", "date"], do: "split 27 feb 2020" },
      doi: { property: ["dublinCore", "source"], do: false },
      image: { property: ["openGraph", "image"], do: "getUrl" },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      title: { property: ["openGraph", "title"], do: false },
      url: { property: ["openGraph", "url"], do: false },
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
    metadataConfig: {
      abstract: { property: ["openGraph", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: false },
      date: { property: ["highwirePress", "online_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      image: { property: ["openGraph", "image"], do: "getUrl" },
      institution: {
        property: ["highwirePress", "author_institution"],
        do: false,
      },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      title: { property: ["openGraph", "title"], do: false },
      url: { property: ["openGraph", "url"], do: false },
      firstpage: { property: ["highwirePress", "firstpage"], do: false },
      lastpage: { property: ["highwirePress", "lastpage"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
      issue: { property: ["highwirePress", "issue"], do: false },
    },
  },
  ethics: {
    name: "Ethics",
    url:
      "https://www.journals.uchicago.edu/action/showFeed?type=etoc&feed=rss&jc=et",
    color: "9",
    filter: true,
    rssOnly: false,

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

    metadataConfig: {
      abstract: { property: ["dublinCore", "description"], do: false },
      author: { property: ["dublinCore", "creator"], do: "stripDoubleSpace" },
      date: { property: ["dublinCore", "date"], do: toIso },
      doi: { property: ["dublinCore", "identifier"], do: "firstInArray" },

      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      title: { property: ["dublinCore", "title"], do: false },
      url: { property: ["dublinCore", "source"], do: false },
    },
  },
  idealistic_studies: {
    name: "Idealistic Studies",
    url:
      "https://www.pdcnet.org/pdc/bvdb.nsf/getrssxml?openagent&synonym=idstudies",
    color: "7",
    filter: true,
    rssOnly: false,

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

    metadataConfig: {
      abstract: { property: ["general", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: "arr?lastFirst" },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      institution: {
        property: ["highwirePress", "author_institution"],
        do: "arr?",
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
  inquiry: {
    name: "Inquiry",
    url: "https://www.tandfonline.com/feed/rss/sinq20",
    color: "6",
    filter: true,
    rssOnly: false,

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

    metadataConfig: {
      abstract: { property: ["dublinCore", "description"], do: false },
      author: {
        property: ["dublinCore", "creator"],
        do: "arr? remove dbl space",
      },
      date: { property: ["dublinCore", "date"], do: "split and form date" },
      doi: { property: ["dublinCore", "identifier"], do: "array2" },
      image: { property: ["openGraph", "image"], do: "get url from object" },
      keywords: { property: ["dublinCore", "subject"], do: "split -> ;" },
      title: { property: ["openGraph", "title"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      url: { property: ["openGraph", "url"], do: false },
    },
  },
  the_philosophical_inquiry: {
    name: "The Philosophical Inquiry",
    url: "https://academic.oup.com/rss/site_5498/3359.xml",
    color: "5",
    filter: true,
    rssOnly: false,

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
    metadataConfig: {
      abstract: { property: ["openGraph", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: "arr?lastFirst" },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      institution: {
        property: ["highwirePress", "author_institution"],
        do: "arr?",
      },
      firstpage: { property: ["highwirePress", "firstpage"], do: false },
      lastpage: { property: ["highwirePress", "lastpage"], do: false },
      title: { property: ["highwirePress", "title"], do: false },
      image: { property: ["openGraph", "image"], do: false },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      url: { property: ["general", "canonical"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
      keywords: { property: ["jsonLd", "keywords"], do: false },
    },
  },
  philosophy_and_phenomenological_research: {
    name: "Philosophy and Phenomenological Research",
    url: "https://onlinelibrary.wiley.com/feed/19331592/most-recent",
    color: "4",
    filter: true,
    rssOnly: false,

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
    metadataConfig: {
      abstract: { property: ["general", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: "arr?lastFirst" },
      date: { property: ["highwirePress", "online_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      institution: {
        property: ["highwirePress", "author_institution"],
        do: "arr?",
      },
      title: { property: ["highwirePress", "title"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      url: { property: ["openGraph", "url"], do: false },
      keywords: { property: ["highwirePress", "keywords"], do: false },
      image: { property: ["openGraph", "image"], do: "get url" },
    },
  },
  the_monist: {
    name: "The Monist",
    url: "http://academic.oup.com/rss/site_5491/3352.xml",
    color: "3",
    filter: true,
    rssOnly: false,

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
    metadataConfig: {
      abstract: { property: ["general", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: "arr?lastFirst" },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      institution: {
        property: ["highwirePress", "author_institution"],
        do: "arr?",
      },
      firstpage: { property: ["highwirePress", "firstpage"], do: false },
      lastpage: { property: ["highwirePress", "lastpage"], do: false },
      title: { property: ["highwirePress", "title"], do: false },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      url: { property: ["general", "canonical"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
      image: { property: ["openGraph", "image"], do: "get url" },
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
    metadataConfig: {
      abstract: { property: ["general", "description"], do: false },
      author: { property: ["highwirePress", "author"], do: "arr?lastFirst" },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      institution: {
        property: ["highwirePress", "author_institution"],
        do: "arr?",
      },
      firstpage: { property: ["highwirePress", "firstpage"], do: false },
      lastpage: { property: ["highwirePress", "lastpage"], do: false },
      title: { property: ["highwirePress", "title"], do: false },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      url: { property: ["general", "canonical"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
      image: { property: ["openGraph", "image"], do: "get url" },
    },
  },
  ergo: {
    name: "Ergo",
    url: "https://www.ergophiljournal.org/e/ergo/longfeed.xml",
    color: "1",
    filter: true,
    rssOnly: false,

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
    metadataConfig: {
      author: { property: ["highwirePress", "author"], do: "arr?lastFirst" },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      title: { property: ["highwirePress", "title"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
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

    metadataConfig: {
      abstract: { property: ["openGraph", "description"], do: false },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      title: { property: ["highwirePress", "title"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      url: { property: ["general", "canonical"], do: false },
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
    metadataConfig: {
      abstract: { property: ["openGraph", "description"], do: "strip" },
      author: { property: ["highwirePress", "author"], do: "arr" },
      date: { property: ["highwirePress", "publication_date"], do: toIso },
      doi: { property: ["highwirePress", "doi"], do: false },
      image: { property: ["openGraph", "image"], do: "geturl" },
      firstpage: { property: ["highwirePress", "firstpage"], do: false },
      lastpage: { property: ["highwirePress", "lastpage"], do: false },
      title: { property: ["highwirePress", "title"], do: false },
      issue: { property: ["highwirePress", "issue"], do: false },
      journalTitle: { property: ["highwirePress", "journal_title"], do: false },
      url: { property: ["general", "canonical"], do: false },
      volume: { property: ["highwirePress", "volume"], do: false },
    },
  },
};

const scrape = require("html-metadata");
const request = require("request");

const go = async (input) => {
  var options = {
    url: "https://www.degruyter.com/view/journals/kantyb/11/1/article-p17.xml",
    jar: request.jar(), // Cookie jar
    headers: {
      // "User-Agent": "webscraper",
    },
  };

  scrape(options).then((metadata, error) => {
    console.log(metadata);
    const metadataKeys = Object.keys(input.metadataConfig);
    const metadataObj = {};
    metadataKeys.forEach((key) => {
      metadataObj[key] =
        metadata[input.metadataConfig[key].property[0]][
          input.metadataConfig[key].property[1]
        ];
    });
    console.log(metadataObj);

    if (error) {
      console.log(error);
    }
  });
};
go(this.config.kant_yearbook);
// const t = Object.keys(
//   this.config.british_journal_for_the_history_of_philosophy.metadataConfig
// );
// console.log(t);
