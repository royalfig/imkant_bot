/*
/ Libs
/ Parser & parser gets and parses RSS feed
/ Scrape/request for getting metatags
*/
let Parser = require("rss-parser");
let parser = new Parser({
  headers: {
    Accept: "application/xml, application/rss+xml, text/xml",
  },
});
const scrape = require("html-metadata");
const request = require("request");

// Filters for limiting data to relevant content
const filterForKant = (postArray) => {
  const regex = RegExp(/Kant/i);
  const results = postArray.filter((post) => regex.test(post.title));
  return results;
};

const filterOutFrontMatter = (postArray) => {
  const regex = RegExp(/Titelseiten|Front Matter|Back Matter/i);
  const results = postArray.filter((post) => !regex.test(post.title));
  return results;
};

// Get RSS feed and parse
exports.getRss = async (config) => {
  const url = config.url;

  // For general sources, limit results to subject
  const filterForKantArticles = config.filter;
  const rssOnly = config.rssOnly;
  if (rssOnly) {
    console.log("RSS Only. Nothing to do right now!");
  }
  try {
    const { items } = await parser.parseURL(url);
    const feedWithoutExtraneousMaterials = filterOutFrontMatter(items);
    const filteredFeed = filterForKantArticles
      ? filterForKant(feedWithoutExtraneousMaterials)
      : feedWithoutExtraneousMaterials;
    const data = [];
    filteredFeed.forEach(async (item) => {
      const metadata = {};
      metadata.journalTitle = config.name;

      metadata.author = config.rssConfig.author.do
        ? config.rssConfig.author.do(item[config.rssConfig.author.property])
        : item[config.rssConfig.author.property];

      metadata.date = config.rssConfig.date.do
        ? config.rssConfig.date.do(item[config.rssConfig.date.property])
        : item[config.rssConfig.date.property];

      metadata.title = config.rssConfig.title.do
        ? config.rssConfig.title.do(item[config.rssConfig.title.property])
        : item[config.rssConfig.title.property];

      metadata.url = config.rssConfig.url.do
        ? config.rssConfig.url.do(item[config.rssConfig.url.property])
        : config.rssConfig.url.property;

      data.push(metadata);
    });
    const onlyUrls = filteredFeed.map((item) => item.link);
    const onlyUniqueUrls = [...new Set(onlyUrls)];
    return onlyUniqueUrls;
  } catch (e) {
    console.log(e);
  }
};

exports.getAndParseMetaTags = async (url, input) => {
  const options = {
    url: url,
    jar: request.jar(), // Cookie jar
  };
  try {
    const metadata = await scrape(options);
    // console.log(metadata);

    const metadataKeys = Object.keys(input.metadataConfig);
    const metadataObj = {};

    // If the key has an associated function (do: ), run it on the metadata
    metadataKeys.forEach((key) => {
      // Return if tag does not exist for current resource
      if (metadata[input.metadataConfig[key].property[0]] === undefined) {
        return;
      }

      if (input.metadataConfig[key].do) {
        metadataObj[key] = input.metadataConfig[key].do(
          metadata[input.metadataConfig[key].property[0]][
            input.metadataConfig[key].property[1]
          ]
        );
      } else {
        metadataObj[key] =
          metadata[input.metadataConfig[key].property[0]][
            input.metadataConfig[key].property[1]
          ];
      }
    });

    return metadataObj;
  } catch (e) {
    console.log(e);
  }
};
