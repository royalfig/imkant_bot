/* Kantian Review:  https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB



*/
let Parser = require("rss-parser");
let parser = new Parser();
let url =
  "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB";

const rss = async url => {
  let result = await parser.parseURL(url);
  console.log(result);
};

rss(url);
