const { getData, postToGhost } = require("./getData");
const Article = require("./createArticle");
const url =
  "https://www.degruyter.com/journalissuetocrss/journals/kant/kant-overview.xml";
// "https://www.cambridge.org/core/rss/product/id/D3E55E88C6269FFD657D4E68B193ADAB"

const obj = async url => {
  const res = await getData(url);
  return res;
};

obj(url).then(res => {
  res.forEach(item => {
    const article = new Article(item).ghostObject;
    postToGhost(article);
  });
});
